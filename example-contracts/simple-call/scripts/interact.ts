import "@nomicfoundation/hardhat-ethers";
import { ethers } from "hardhat";
import { OracleCaller } from "../typechain-types";

async function main() {
  const [deployer] = await ethers.getSigners();
  const contractAddress = "0x50e52f7F68e6216Ed8B0Ff3709EF133831d1e3fa";

  const oracleCaller = await ethers.getContractAt("OracleCaller", contractAddress) as OracleCaller;

  const inputData = ethers.toUtf8Bytes("https://api.multiversx.com/stats");

  const result = await oracleCaller.callAPI(inputData);

  console.log("Result:", result.toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error:", error);
    process.exit(1);
  });
