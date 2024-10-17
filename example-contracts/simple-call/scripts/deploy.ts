import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contract with account:", deployer.address);

  const OracleCaller = await ethers.getContractFactory("OracleCaller");
  const oracleCaller = await OracleCaller.deploy();
  const address = await oracleCaller.getAddress();

  console.log("Contract deployed at address:", address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error:", error);
    process.exit(1);
  });
