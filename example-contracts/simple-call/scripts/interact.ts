import "@nomicfoundation/hardhat-ethers";
import { ethers } from "hardhat";
import { OracleCaller } from "../typechain-types";

async function main() {
  const [deployer] = await ethers.getSigners();
  const contractAddress = "0x030739eAC628af0f53683b480FA3Fc4FA8D1b602";

  const oracleCaller = await ethers.getContractAt("OracleCaller", contractAddress) as OracleCaller;

  // BTC/USD price feed
  // const inputData = ethers.toUtf8Bytes("https://aggregator-devnet.walrus.space/v1/8jBYLvsl99Avd0qMLqFl8acRfb7aJ_ExeKTrR1vVRUE");

  // Max weather price feed
  const inputData = ethers.toUtf8Bytes("https://aggregator-devnet.walrus.space/v1/s_6vaKYsdclMRE6MV1rS3cWhA2NouVoQWlwVvY5OzzU");

  const result = await oracleCaller.callAPI(inputData);

  console.log("Result:", result.toString());

  const tx = await oracleCaller.callAPITx(inputData);

  console.log("Transaction hash:", tx.hash);

  const result2 = await tx.wait();

  console.log("Transaction complete");

  console.log("Result:", result2?.logs);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error:", error);
    process.exit(1);
  });
