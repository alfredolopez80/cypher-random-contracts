import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/ethers-v5";
import "hardhat-typechain";
import "hardhat-gas-reporter";
import "hardhat-contract-sizer";
import "hardhat-spdx-license-identifier";
import "@nomiclabs/hardhat-web3";
import "solidity-coverage";

dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  networks: {
    mainnet: {
      chainId: 1,
      url: `https://mainnet.infura.io/v3/${process.env.INFURAKEY}`,
      gasPrice: 65000000000,
      accounts: {
        mnemonic: process.env.MNEMONIC,
      },
    },
    ropsten: {
      chainId: 3,
      url: `https://ropsten.infura.io/v3/${process.env.INFURAKEY}`,
      gasPrice: 65000000000,
      accounts: {
        mnemonic: process.env.MNEMONIC,
      },
    },
    rinkeby: {
      chainId: 4,
      url: `https://rinkeby.infura.io/v3/${process.env.INFURAKEY}`,
      gasPrice: 65000000000,
      accounts: {
        mnemonic: process.env.MNEMONIC,
        count: parseInt(`${process.env.ACCOUNTS}`),
      },
    },
    bsc_mainnet: {
      chainId: 56,
      url: process.env.URL_BSC,
      gasPrice: 5000000000,
      accounts: {
        mnemonic: process.env.MNEMONIC,
      },
    },
    bsc_testnet: {
      chainId: 97,
      url: process.env.URL_TESTNET_BSC,
      gasPrice: 20000000000,
      accounts: {
        mnemonic: process.env.MNEMONIC,
        count: parseInt(`${process.env.ACCOUNTS}`),
      },
    },
    polygon: {
      chainId: 137,
      url: `https://polygon-mainnet.infura.io/v3/${process.env.INFURAKEY}`,
      gasPrice: 2000000000,
      accounts: {
        mnemonic: process.env.MNEMONIC,
        count: parseInt(`${process.env.ACCOUNTS}`),
      },
    },
    mumbai: {
      chainId: 80001,
      url: `https://polygon-mumbai.infura.io/v3/${process.env.INFURAKEY}`,
      gasPrice: 1000000000,
      accounts: {
        mnemonic: process.env.MNEMONIC,
        count: parseInt(`${process.env.ACCOUNTS}`),
      },
    },
    moonbase: {
      // Need to go to Dicord channel and get DEV (coin in Moonbase Alphanet)
      // And Verify Procedure in https://docs.moonbeam.network/networks/testnet/
      // Faucet https://docs.moonbeam.network/getting-started/testnet/faucet/
      // And Explorer https://moonbase-blockscout.testnet.moonbeam.network/ (Recommend this, https://moonbase.subscan.io/ is too early)
      chainId: 1287,
      url: process.env.URL_MOONBEAM_TESTNET,
      gasPrice: 50000000000,
      accounts: {
        mnemonic: process.env.MNEMONIC,
      },
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      gasPrice: 35000000000,
      blockGasLimit: 149000000,
    },
    hardhat: {
      gasPrice: 35000000000,
      blockGasLimit: 149000000,
      chainId: 31337,
      accounts: {
        mnemonic: process.env.MNEMONIC,
        count: parseInt(`${process.env.ACCOUNTS}`),
        accountsBalance: "1000000000000000000000",
      },
    },
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 500,
      },
    },
  },
  gasReporter: {
    currency: "USD",
    gasPrice: 200,
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    maxMethodDiff: 10,
  },
  contractSizer: {
    alphaSort: true,
    runOnCompile: true,
    disambiguatePaths: false,
  },
  spdxLicenseIdentifier: {
    overwrite: true,
    runOnCompile: true,
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    // apiKey: process.env.BSCSCAN_API_KEY,
    apiKey: process.env.POLYGON_API_KEY,
    // apiKey: process.env.ETHERSCAN_API_KEY,
  },
  mocha: {
    timeout: 500000,
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};

export default config;