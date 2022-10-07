import '@nomicfoundation/hardhat-toolbox';


import { HardhatUserConfig } from 'hardhat/config';

const dotenv = require("dotenv")
dotenv.config({
  path: __dirname+'/.env'
});

const ALCHEMY_API_KEY = process.env.ALCH_API_KEY;

const config: HardhatUserConfig = {
  solidity: '0.8.16',
  networks: {
    goerli: {
      timeout: 10 * 60 * 1000,
      url: 'https://eth-goerli.alchemyapi.io/v2/' + ALCHEMY_API_KEY,
      accounts: [process.env.PRIVATE_KEY_1 as string],
    },
  },
  etherscan: {
    apiKey: {
      goerli: process.env.ETHERSCAN_API_KEY
    },
  },
  mocha: {
    timeout: 10 * 60 * 1000,
  },
};

export default config;
