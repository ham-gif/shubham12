#![cfg(test)]

use super::*;
use soroban_sdk::{testutils::Address as _, Address, Env, String};

#[test]
fn test_factory_initialize_and_register() {
    let env = Env::default();
    env.mock_all_auths();

    let admin = Address::generate(&env);
    let creator = Address::generate(&env);
    let pool_contract = Address::generate(&env);
    let token_a = Address::generate(&env);
    let token_b = Address::generate(&env);
    let lp_token = Address::generate(&env);

    let contract_id = env.register_contract(None, FactoryContract);
    let client = FactoryContractClient::new(&env, &contract_id);

    client.initialize(&admin);

    let pool_id = client.register_pool(
        &creator,
        &pool_contract,
        &token_a,
        &token_b,
        &String::from_str(&env, "Token A"),
        &String::from_str(&env, "Token B"),
        &lp_token,
    );

    assert_eq!(pool_id, 0);
    assert_eq!(client.get_count(), 1);

    let pool_info = client.get_pool(&0);
    assert_eq!(pool_info.pool_contract, pool_contract);
    assert_eq!(pool_info.token_a, token_a);
    assert_eq!(pool_info.token_b, token_b);
    assert_eq!(pool_info.lp_token, lp_token);
    assert_eq!(pool_info.creator, creator);

    assert!(client.pair_exists(&token_a, &token_b));
    assert!(client.pair_exists(&token_b, &token_a));

    let pool_info_by_pair = client.get_pool_by_pair(&token_a, &token_b).unwrap();
    assert_eq!(pool_info_by_pair.pool_contract, pool_contract);
}

#[test]
#[should_panic(expected = "pool already exists")]
fn test_register_duplicate_pool() {
    let env = Env::default();
    env.mock_all_auths();

    let admin = Address::generate(&env);
    let creator = Address::generate(&env);
    let pool_contract = Address::generate(&env);
    let token_a = Address::generate(&env);
    let token_b = Address::generate(&env);
    let lp_token = Address::generate(&env);

    let contract_id = env.register_contract(None, FactoryContract);
    let client = FactoryContractClient::new(&env, &contract_id);

    client.initialize(&admin);

    client.register_pool(
        &creator,
        &pool_contract,
        &token_a,
        &token_b,
        &String::from_str(&env, "A"),
        &String::from_str(&env, "B"),
        &lp_token,
    );

    client.register_pool(
        &creator,
        &pool_contract,
        &token_a,
        &token_b,
        &String::from_str(&env, "A"),
        &String::from_str(&env, "B"),
        &lp_token,
    );
}

#[test]
fn test_get_pools_pagination() {
    let env = Env::default();
    env.mock_all_auths();

    let admin = Address::generate(&env);
    let creator = Address::generate(&env);

    let contract_id = env.register_contract(None, FactoryContract);
    let client = FactoryContractClient::new(&env, &contract_id);

    client.initialize(&admin);

    for i in 0..5 {
        client.register_pool(
            &creator,
            &Address::generate(&env),
            &Address::generate(&env),
            &Address::generate(&env),
            &String::from_str(&env, "A"),
            &String::from_str(&env, "B"),
            &Address::generate(&env),
        );
    }

    assert_eq!(client.get_count(), 5);
    
    let pools_page1 = client.get_pools(&0, &3);
    assert_eq!(pools_page1.len(), 3);

    let pools_page2 = client.get_pools(&1, &3);
    assert_eq!(pools_page2.len(), 2);
}
