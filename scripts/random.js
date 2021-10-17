require('dotenv').config();
const { ethers } = require("ethers");

const { abi } = require('../artifacts/contracts/RandomEmitter.sol/RandomEmitter.json');

const network = process.env.NETWORK;

var linkTokenAddress = ""
var explorer = ""
var chainId = 80001


if (network == "mumbai") {
    console.log("Mumbai Testnet!")
    linkTokenAddress = '0x326C977E6efc84E512bB9C30f76E30c160eD06FB'
    explorer = "https://mumbai.polygonscan.com/"
    chainId = 80001
}
else {
    console.log("Polygon Mainnet!")
    linkTokenAddress = '0xb0897686c545045aFc77CF20eC7A532E3120E0F1'
    explorer = "https://polygonscan.com/"
    chainId = 137

}


// Set up wallet.
const privateKey = process.env.TEST_PRIVATE_KEY;
const alchemyEndpoint = process.env.ALCHEMY_ENDPOINT;

const provider = new ethers.providers.JsonRpcProvider(alchemyEndpoint, chainId);
const wallet = new ethers.Wallet(privateKey, provider)

// Get Pack contract
const deployedContractAddress = process.env.CONTRACT_ADDRESS;
const randomEmitter = new ethers.Contract(deployedContractAddress, abi, wallet);

async function main() {
    const nonce = await provider.getTransactionCount(wallet.address);
    console.log(`${wallet.address} nonce: ${nonce.toString()}`)
    const randomNumberRequest = await randomEmitter.requestRandomNumber({ gasPrice: 90000000000, nonce: nonce });
    // const randomNumberRequest = await randomEmitter.returnLink({ gasLimit: 1000000 });
    console.log(`${explorer}tx/${randomNumberRequest.hash}`);

    await randomNumberRequest.wait()

    console.log('Random number request tx hash: ', randomNumberRequest.hash);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });