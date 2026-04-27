#![cfg(test)]

use super::*;
use crate::token::Client as TokenClient;
use crate::token::WASM as TokenWasm;
use soroban_sdk::{testutils::Address as _, Address, Env, String};

#[test]
fn test_pool_liquidity_and_swap() {
    let env = Env::default();
    env.mock_all_auths();

    let creator = Address::generate(&env);
    let provider = Address::generate(&env);
    let trader = Address::generate(&env);

    // Register Token A
    let token_a_id = env.register_contract_wasm(None, TokenWasm);
    let token_a = TokenClient::new(&env, &token_a_id);
    token_a.initialize(
        &creator,
        &creator,
        &String::from_str(&env, "Token A"),
        &String::from_str(&env, "TKNA"),
        &7,
    );

    // Register Token B
    let token_b_id = env.register_contract_wasm(None, TokenWasm);
    let token_b = TokenClient::new(&env, &token_b_id);
    token_b.initialize(
        &creator,
        &creator,
        &String::from_str(&env, "Token B"),
        &String::from_str(&env, "TKNB"),
        &7,
    );

    // Register Pool
    let pool_id = env.register_contract(None, PoolContract);
    let pool = PoolContractClient::new(&env, &pool_id);

    // Register LP Token with Pool as minter
    let lp_token_id = env.register_contract_wasm(None, TokenWasm);
    let lp_token = TokenClient::new(&env, &lp_token_id);
    lp_token.initialize(
        &creator,
        &pool_id, // minter is the pool contract
        &String::from_str(&env, "LP Token"),
        &String::from_str(&env, "LP"),
        &7,
    );

    pool.initialize(&creator, &token_a_id, &token_b_id, &lp_token_id, &30);

    // Mint tokens to provider
    token_a.mint(&creator, &provider, &10000);
    token_b.mint(&creator, &provider, &10000);

    // Add liquidity
    pool.add_liquidity(&provider, &1000, &1000, &0);

    let reserves = pool.get_reserves();
    assert_eq!(reserves.reserve_a, 1000);
    assert_eq!(reserves.reserve_b, 1000);
    assert_eq!(reserves.total_lp_supply, 1000);
    assert_eq!(pool.get_lp_balance(&provider), 1000);

    // Swap
    token_a.mint(&creator, &trader, &1000);
    let swap_result = pool.swap(&trader, &token_a_id, &1000, &0);
    
    assert!(swap_result.amount_out > 0);
    assert!(swap_result.fee_paid > 0);
    assert_eq!(token_b.balance(&trader), swap_result.amount_out);

    let new_reserves = pool.get_reserves();
    assert_eq!(new_reserves.reserve_a, 2000);
    assert_eq!(new_reserves.reserve_b, 1000 - swap_result.amount_out);

    // Remove liquidity
    pool.remove_liquidity(&provider, &500, &0, &0);
    let final_reserves = pool.get_reserves();
    assert_eq!(final_reserves.total_lp_supply, 500);
}

#[test]
#[should_panic(expected = "already initialized")]
fn test_pool_double_init() {
    let env = Env::default();
    let creator = Address::generate(&env);
    let token_a = Address::generate(&env);
    let token_b = Address::generate(&env);
    let lp_token = Address::generate(&env);

    let pool_id = env.register_contract(None, PoolContract);
    let pool = PoolContractClient::new(&env, &pool_id);

    pool.initialize(&creator, &token_a, &token_b, &lp_token, &30);
    pool.initialize(&creator, &token_a, &token_b, &lp_token, &30);
}

#[test]
#[should_panic(expected = "slippage exceeded")]
fn test_swap_insufficient_amount_out() {
    let env = Env::default();
    env.mock_all_auths();
    let creator = Address::generate(&env);
    let trader = Address::generate(&env);
    let token_a_id = env.register_contract_wasm(None, TokenWasm);
    let token_b_id = env.register_contract_wasm(None, TokenWasm);
    let lp_token_id = env.register_contract_wasm(None, TokenWasm);
    let pool_id = env.register_contract(None, PoolContract);
    let pool = PoolContractClient::new(&env, &pool_id);

    let token_a = TokenClient::new(&env, &token_a_id);
    token_a.initialize(&creator, &creator, &String::from_str(&env, "A"), &String::from_str(&env, "A"), &7);
    let token_b = TokenClient::new(&env, &token_b_id);
    token_b.initialize(&creator, &creator, &String::from_str(&env, "B"), &String::from_str(&env, "B"), &7);
    let lp_token = TokenClient::new(&env, &lp_token_id);
    lp_token.initialize(&creator, &pool_id, &String::from_str(&env, "LP"), &String::from_str(&env, "LP"), &7);

    pool.initialize(&creator, &token_a_id, &token_b_id, &lp_token_id, &30);

    token_a.mint(&creator, &creator, &1000);
    token_b.mint(&creator, &creator, &1000);
    pool.add_liquidity(&creator, &1000, &1000, &0);

    token_a.mint(&creator, &trader, &100);
    pool.swap(&trader, &token_a_id, &100, &1000); // Expecting 1000 but only ~96 will be out
}
