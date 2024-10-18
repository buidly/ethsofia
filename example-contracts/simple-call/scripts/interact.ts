import "@nomicfoundation/hardhat-ethers";
import { ethers } from "hardhat";
import { GenericCaller } from "../typechain-types";

async function main() {
  const [deployer] = await ethers.getSigners();
  const contractAddress = "0xF9B1158070BB934D0eFbad99D9FfaeB1436b01Fa";

  const genericCaller = await ethers.getContractAt("GenericCaller", contractAddress) as GenericCaller;

  // BTC/USD price feed
  const inputDataBTCUSD = ethers.toUtf8Bytes("https://aggregator-devnet.walrus.space/v1/8jBYLvsl99Avd0qMLqFl8acRfb7aJ_ExeKTrR1vVRUE");
  const btcPrice = await genericCaller.callAPI(inputDataBTCUSD);
  console.log("BTC Price:", btcPrice.toString());

  // Max weather price feed
  const inputDataMaxTemp = ethers.toUtf8Bytes("https://aggregator-devnet.walrus.space/v1/s_6vaKYsdclMRE6MV1rS3cWhA2NouVoQWlwVvY5OzzU");
  const maxTemp = Number(await genericCaller.callAPI(inputDataMaxTemp)) / 10;
  console.log("Max temp:", maxTemp.toString());

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error:", error);
    process.exit(1);
  });
