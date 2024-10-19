import "@nomicfoundation/hardhat-ethers";
import { ethers } from "hardhat";
import { DemoExample } from "../typechain-types";

async function getGenericCaller() {
  const [deployer] = await ethers.getSigners();
  const contractAddress = "contract_address";
  const genericCaller = await ethers.getContractAt("DemoExample", contractAddress) as DemoExample;
  return genericCaller;
}

async function updateBTCPrice() {
  const genericCaller = await getGenericCaller();
  const btcPricetx = await genericCaller.updateBTCPrice();
  console.log("Price feed update TxHash: ", btcPricetx.hash);

  const logs = await btcPricetx.wait();
  console.log("Price feed update Logs ", logs?.logs);
}

async function getBTCPrice() {
  const genericCaller = await getGenericCaller();
  const btcPrice = await genericCaller.getBTCPrice();
  console.log("=======> Get BTC Price: ", btcPrice.toString());
}

async function updateMaxWeather() {
    const genericCaller = await getGenericCaller();
    const maxTempTx = await genericCaller.updateMaxWeather();
    console.log("Weather feed update TxHash: ", maxTempTx.hash);
  
    const logs = await maxTempTx.wait();
    console.log("Weather feed Logs ", logs?.logs);
  }
  
  async function getMaxWeather() {
    const genericCaller = await getGenericCaller();
    const maxTemp = await genericCaller.getMaxWeather();
    console.log("=======> Max temp: ", maxTemp.toString());
  }

async function main() {
  await updateBTCPrice();
  await getBTCPrice();

  // await updateMaxWeather();
  // await getMaxWeather();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error:", error);
    process.exit(1);
  });