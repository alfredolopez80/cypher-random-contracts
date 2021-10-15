# VoxoDeus Random Number Generator

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```

1. `yarn install`
2. `yarn hardhat compile`
3. `yarn hardhat run --network mumbai scripts/deploy.js`
4. Note down contract address, update `.env` , reload envs
5. Verify contracts

```
yarn hardhat verify --network mumbai $CONTRACT_ADDRESS 0x8C7382F9D8f56b33781fE506E897a4F1e2d17255 0x326C977E6efc84E512bB9C30f76E30c160eD06FB 0x6e75b569a01ef56d18cab6a8e71e6600d6ce853834d4a5748b720d06f878b3a4
```

6. Fund contract with LINK , (make sure to visit the faucet and make sure you have 10LINK)

` yarn hardhat run --network mumbai scripts/fund.js` 7.
Request for a random number
` yarn hardhat run --network mumbai scripts/random.js` 8.
Check the explorer link to verify randomNumberRequest is fullfilled.

9. Optional (get LINK back from contract)
   ` yarn hardhat run --network mumbai scripts/returnLink.js`
