import "@nomicfoundation/hardhat-ethers";
import { ethers } from "hardhat";
import { DemoExample } from "../typechain-types";

async function main() {
  const [deployer] = await ethers.getSigners();
  const contractAddress = "0xAe98C2C1fa5858c682f2f857E5221Be0EbcAbC0c";

  const genericCaller = await ethers.getContractAt("DemoExample", contractAddress) as DemoExample;

  // // BTC/USD price feed
  const btcPricetx = await genericCaller.updateBTCPrice();
  console.log(btcPricetx);
  const logs = await btcPricetx.wait();
  console.log("Logs ", logs?.logs);

  // // BTC/USD price feed
  const btcPrice = await genericCaller.getBTCPrice();
  console.log("BTC Price:", btcPrice.toString());

  // // Max weather price feed
  // const maxTemp = Number(await genericCaller.getMaxWeather()) / 10;
  // console.log("Max temp:", maxTemp.toString());

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error:", error);
    process.exit(1);
  });
