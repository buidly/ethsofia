import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.27",
  networks: {
    OraclesNetwork: {
      url: "http://127.0.0.1:8545",
      chainId: 99001,
      accounts: [process.env.PRIVATE_KEY as string],
    },
    SnapData:{
      url: "http://34.91.164.215:8545",
      chainId: 99001,
      accounts: [process.env.PRIVATE_KEY as string],
    }
  }
};

export default config;
