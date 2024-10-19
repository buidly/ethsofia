import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying demo example contract with account:", deployer.address);

  const demoExample = await ethers.getContractFactory("DemoExample");
  const genericCaller = await demoExample.deploy();
  const address = await genericCaller.getAddress();

  console.log("Contract deployed at address:", address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error:", error);
    process.exit(1);
  });
