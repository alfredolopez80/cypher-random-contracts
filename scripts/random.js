require('dotenv').config();
const { ethers } = require("ethers");

const { abi } = require('../artifacts/contracts/RandomEmitter.sol/RandomEmitter.json');

// Set up wallet.
const privateKey = process.env.TEST_PRIVATE_KEY;
const alchemyEndpoint = process.env.ALCHEMY_ENDPOINT;

const provider = new ethers.providers.JsonRpcProvider(alchemyEndpoint, 80001);
const wallet = new ethers.Wallet(privateKey, provider)

// Get Pack contract
const deployedContractAddress = process.env.CONTRACT_ADDRESS;
const randomEmitter = new ethers.Contract(deployedContractAddress, abi, wallet);

async function main() {
    const randomNumberRequest = await randomEmitter.requestRandomNumber({ gasLimit: 1000000 });
    // const randomNumberRequest = await randomEmitter.returnLink({ gasLimit: 1000000 });
    console.log(`https://mumbai.polygonscan.com/tx/${randomNumberRequest.hash}`);

    await randomNumberRequest.wait()

    console.log('Random number request tx hash: ', randomNumberRequest.hash);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });