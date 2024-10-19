import "@nomicfoundation/hardhat-ethers";
import { ethers } from "hardhat";
import { GenericCaller } from "../typechain-types";

async function main() {
  const [deployer] = await ethers.getSigners();
  const contractAddress = "0x380F163A1D6f9322E3C712a43b6c261C21214C6d";

  const genericCaller = await ethers.getContractAt("GenericCaller", contractAddress) as GenericCaller;

  // BTC/USD price feed
  const inputDataBTCUSD = ethers.toUtf8Bytes("https://aggregator-devnet.walrus.space/v1/8jBYLvsl99Avd0qMLqFl8acRfb7aJ_ExeKTrR1vVRUE");
  const btcPrice = await genericCaller.callAPI(inputDataBTCUSD);
  console.log("BTC Price:", btcPrice.toString());

  // Max weather price feed
  const inputDataMaxTemp = ethers.toUtf8Bytes("https://aggregator-devnet.walrus.space/v1/0x55479d7b3bdda3e6d00d429e0eec6db84b68b46a109cecfaa86f98abfc390f7a");
  const maxTemp = Number(await genericCaller.callAPI(inputDataMaxTemp)) / 10;
  console.log("Max temp:", maxTemp.toString());

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error:", error);
    process.exit(1);
  });
