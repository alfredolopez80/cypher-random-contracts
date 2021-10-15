# VoxoDeus Random Number Generator

This is a simple contract that full-fills randomNumberRequests using ChainLinks VRF Contract.

## Features

[x] Request Random Number

[x] Return Link from Contract

## Installation

`yarn install`

## Compile contracts

`yarn hardhat compile`

## Deploy contracts

1. `yarn hardhat run --network mumbai scripts/deploy.js`
2. Note down contract address, update `.env` , reload envs

## Verify contracts on scan explorer (Etherscan/Polygonscan)

Arguements:

1. contract address
2. contract constructor vars

Example:

```
yarn hardhat verify --network mumbai $CONTRACT_ADDRESS 0x8C7382F9D8f56b33781fE506E897a4F1e2d17255 0x326C977E6efc84E512bB9C30f76E30c160eD06FB 0x6e75b569a01ef56d18cab6a8e71e6600d6ce853834d4a5748b720d06f878b3a4
```

## Set-up

1. First fund your wallet with LINK tokens by visiting the [faucet](https://faucets.chain.link/)

2. Adjust the amount of LINK tokens in [](scripts/fund.js), note that you can always get your LINK back from this contract

3. Fund contract with LINK tokens

` yarn hardhat run --network mumbai scripts/fund.js`

## Usage

### Request for a random number

` yarn hardhat run --network mumbai scripts/random.js`

Check the explorer link to verify randomNumberRequest is full filled

### Return LINK to owner address from contract

` yarn hardhat run --network mumbai scripts/returnLink.js`
