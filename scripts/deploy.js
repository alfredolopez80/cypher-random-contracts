// Chainlink info for Rinkeby
const { ethers } = require("hardhat");

const vrfCoordinator = '0x8C7382F9D8f56b33781fE506E897a4F1e2d17255'
const linkTokenAddress = '0x326C977E6efc84E512bB9C30f76E30c160eD06FB'
const keyHash = '0x6e75b569a01ef56d18cab6a8e71e6600d6ce853834d4a5748b720d06f878b3a4'

async function main() {

    const [deployer] = await ethers.getSigners();

    console.log(
        "Deploying contracts with the account:",
        deployer.address
    );

    console.log("Account balance:", (await deployer.getBalance()).toString());

    const Factory = await ethers.getContractFactory("RandomEmitter");
    const randomEmitter = await Factory.deploy(vrfCoordinator, linkTokenAddress, keyHash);

    console.log("Random Emitter address:", randomEmitter.address);
    consol.log(`https://mumbai.polygonscan.com/address/${randomEmitter.address}`,)
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });

// Random Emitter address -- 0x21e232d1fA22048c3015826d00d1c252599Bd9eb