import {run, ethers, network } from "hardhat";
import dotenv from "dotenv";
// Get LINK token ABI
import { Contract } from "../abi/LinkToken"

dotenv.config();

var linkTokenAddress = ""
var explorer = ""
var chainId = 80001


if (network.name == "mumbai") {
	console.log("Mumbai Testnet!")
	linkTokenAddress = '0x326C977E6efc84E512bB9C30f76E30c160eD06FB'
	explorer = "https://mumbai.polygonscan.com/"
	chainId = 80001
} else if(network.name == "hardhat") {
    console.log("Test Deployment in Hardhat!")
    linkTokenAddress = '0xb0897686c545045aFc77CF20eC7A532E3120E0F1'
    explorer = "https://hardhatscan.com"
    chainId = 31337
} else {
    console.log("Polygon Mainnet!")
    linkTokenAddress = '0xb0897686c545045aFc77CF20eC7A532E3120E0F1'
    explorer = "https://polygonscan.com/"
    chainId = 137

}


// Set up wallet.
const privateKey = process.env.TEST_PRIVATE_KEY || "";

const deployedContractAddress = process.env.CONTRACT_ADDRESS;

const wallet = new ethers.Wallet(privateKey, ethers.provider)
// Get LINK contract
const linkContract = new ethers.Contract(linkTokenAddress, Contract.abi, wallet);

const value = ethers.utils.parseEther('0.1');
console.log(`Going to transfer ${value}  LINK tokens to ${deployedContractAddress}`)

async function main() {

	// Hardhat always runs the compile task when running scripts with its command
	// line interface.
	//
	// If this script is run directly using `node` you may want to call compile
	// manually to make sure everything is compiled
	await run('compile');

    const nonce = await ethers.provider.getTransactionCount(wallet.address);
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
