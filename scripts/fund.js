require('dotenv').config();
const { ethers } = require("ethers");

// Get LINK token ABI
const { abi } = require('../artifacts/@chainlink/contracts/src/v0.8/interfaces/LinkTokenInterface.sol/LinkTokenInterface.json')

// Set up wallet.
const privateKey = process.env.TEST_PRIVATE_KEY;
const alchemyEndpoint = process.env.ALCHEMY_ENDPOINT;

const deployedContractAddress = process.env.CONTRACT_ADDRESS;

const provider = new ethers.providers.JsonRpcProvider(alchemyEndpoint, 80001);
const wallet = new ethers.Wallet(privateKey, provider)

// Get LINK contract
const linkTokenAddress = '0x326C977E6efc84E512bB9C30f76E30c160eD06FB'
const linkContract = new ethers.Contract(linkTokenAddress, abi, wallet);

const value = ethers.utils.parseEther('9.9');

async function main() {
    const transferTx = await linkContract.transfer(deployedContractAddress, value);
    console.log(`https://mumbai.polygonscan.com/tx/${transferTx.hash}`);
    await transferTx.wait();

}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
