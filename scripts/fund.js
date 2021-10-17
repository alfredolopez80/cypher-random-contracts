require('dotenv').config();
const { ethers } = require("ethers");

// Get LINK token ABI
const { abi } = require('../artifacts/@chainlink/contracts/src/v0.8/interfaces/LinkTokenInterface.sol/LinkTokenInterface.json')

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

const deployedContractAddress = process.env.CONTRACT_ADDRESS;

const provider = new ethers.providers.JsonRpcProvider(alchemyEndpoint, chainId);
const wallet = new ethers.Wallet(privateKey, provider)
// Get LINK contract
const linkContract = new ethers.Contract(linkTokenAddress, abi, wallet);

const value = ethers.utils.parseEther('0.1');
console.log(`Going to transfer ${value}  LINK tokens to ${deployedContractAddress}`)

async function main() {
    const nonce = await provider.getTransactionCount(wallet.address);
    console.log(`${wallet.address} nonce: ${nonce.toString()}`)

    const transferTx = await linkContract.transfer(deployedContractAddress, value, { gasPrice: 90000000000, nonce: nonce });
    console.log(`${explorer}tx/${transferTx.hash}`);
    await transferTx.wait();

}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
