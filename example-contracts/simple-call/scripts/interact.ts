import "@nomicfoundation/hardhat-ethers";
import { ethers } from "hardhat";
import { OracleCaller } from "../typechain-types";

async function main() {
  const [deployer] = await ethers.getSigners();
  const contractAddress = "0xb6dCF8e86eb470ebFDf80ab4b2D06AA17DA7860B";

  const oracleCaller = await ethers.getContractAt("OracleCaller", contractAddress) as OracleCaller;

  const inputData = ethers.toUtf8Bytes("https://api.multiversx.com/stats");

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
