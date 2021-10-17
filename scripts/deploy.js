// Chainlink info for Rinkeby
const { ethers } = require("hardhat");


const network = process.env.NETWORK;

var vrfCoordinator = ""
var linkTokenAddress = ""
var keyHash = ""
var explorer = "https://mumbai.polygonscan.com/"
var chainId = 80001


if (network == "mumbai") {
    console.log("Mumbai Testnet!")
    vrfCoordinator = '0x8C7382F9D8f56b33781fE506E897a4F1e2d17255'
    linkTokenAddress = '0x326C977E6efc84E512bB9C30f76E30c160eD06FB'
    keyHash = '0x6e75b569a01ef56d18cab6a8e71e6600d6ce853834d4a5748b720d06f878b3a4'
    explorer = "https://mumbai.polygonscan.com/"
    chainId = 80001
}
else {
    console.log("Polygon Mainnet!")
    vrfCoordinator = '0x3d2341ADb2D31f1c5530cDC622016af293177AE0'
    linkTokenAddress = '0xb0897686c545045aFc77CF20eC7A532E3120E0F1'
    keyHash = '0xf86195cf7690c55907b2b611ebb7343a6f649bff128701cc542f0569e2c549da'
    explorer = "https://polygonscan.com/"
    chainId = 137


}
const privateKey = process.env.TEST_PRIVATE_KEY;
const alchemyEndpoint = process.env.ALCHEMY_ENDPOINT;


const provider = new ethers.providers.JsonRpcProvider(alchemyEndpoint, chainId);
const wallet = new ethers.Wallet(privateKey, provider)


async function main() {

    const [deployer] = await ethers.getSigners();

    console.log(
        "Deploying contracts with the account:",
        deployer.address
    );
    const nonce = await provider.getTransactionCount(wallet.address);
    console.log(`${wallet.address} nonce: ${nonce.toString()}`)

    console.log("Account balance:", (await deployer.getBalance()).toString());

    const Factory = await ethers.getContractFactory("RandomEmitter");
    const randomEmitter = await Factory.deploy(vrfCoordinator, linkTokenAddress, keyHash, { gasPrice: 90000000000, nonce: nonce });

    console.log("Random Emitter address:", randomEmitter.address);
    console.log(`${explorer}/tx/${randomEmitter.hash}`)

    console.log(`${explorer}/address/${randomEmitter.address}`)
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });

// Random Emitter address -- 0x21e232d1fA22048c3015826d00d1c252599Bd9eb