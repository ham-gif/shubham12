import { rpc, Contract, Address, scValToNative } from "@stellar/stellar-sdk";

const server = new rpc.Server("https://soroban-testnet.stellar.org");
const FACTORY_ID = "CC6XX5QZTRPAHY2NU23LE6RKJUAQIQVHJURLU2VRKMV43XZWPOA7CGTT";
const TOKEN_A = "CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC"; // XLM
const TOKEN_B = "CCUUYZWLVQ4QLFFPE4CBGTP7Q6JSPZ7HF54ETS5C2BSG7XPG4KLX6SFH"; // SDKE

async function getPool() {
  const factory = new Contract(FACTORY_ID);
  
  try {
    // Some factories use get_pool(tokenA, tokenB)
    console.log("Checking for existing pool...");
    // This is a guess on the method name. Let me check the contract first.
  } catch (e) {
    console.error(e);
  }
}
getPool();
