import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contract with account:", deployer.address);

  const GenericCaller = await ethers.getContractFactory("GenericCaller");
  const genericCaller = await GenericCaller.deploy();
  const address = await genericCaller.getAddress();

  console.log("Contract deployed at address:", address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error:", error);
    process.exit(1);
  });
