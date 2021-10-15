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
    const returnLinkRequest = await randomEmitter.returnLink({ gasLimit: 1000000 });
    console.log(`https://mumbai.polygonscan.com/tx/${returnLinkRequest.hash}`);
    await returnLinkRequest.wait()
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });