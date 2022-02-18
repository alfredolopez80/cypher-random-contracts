import { Event } from 'ethers'
import { run, ethers, network } from 'hardhat'
import dotenv from 'dotenv'

import { Contract } from '../abi/RandomEmitter'

dotenv.config()

let vrfCoordinator = ''
let linkTokenAddress = ''
let keyHash = ''
let fee: unknown
let explorer = 'https://mumbai.polygonscan.com'
let chainId = 80001

if (network.name == 'mumbai') {
  console.log('Mumbai Testnet!')
  vrfCoordinator = '0x8C7382F9D8f56b33781fE506E897a4F1e2d17255'
  linkTokenAddress = '0x326C977E6efc84E512bB9C30f76E30c160eD06FB'
  keyHash = '0x6e75b569a01ef56d18cab6a8e71e6600d6ce853834d4a5748b720d06f878b3a4'
  fee = ethers.utils.parseEther('0.0005')
  explorer = 'https://mumbai.polygonscan.com'
  chainId = 80001
} else if (network.name == 'hardhat') {
  console.log('Test Deployment in Hardhat!')
  vrfCoordinator = '0x3d2341ADb2D31f1c5530cDC622016af293177AE0'
  linkTokenAddress = '0xb0897686c545045aFc77CF20eC7A532E3120E0F1'
  keyHash = '0xf86195cf7690c55907b2b611ebb7343a6f649bff128701cc542f0569e2c549da'
  fee = ethers.utils.parseEther('0.0005')
  explorer = 'https://hardhatscan.com'
  chainId = 31337
} else {
  console.log('Polygon Mainnet!')
  vrfCoordinator = '0x3d2341ADb2D31f1c5530cDC622016af293177AE0'
  linkTokenAddress = '0xb0897686c545045aFc77CF20eC7A532E3120E0F1'
  keyHash = '0xf86195cf7690c55907b2b611ebb7343a6f649bff128701cc542f0569e2c549da'
  fee = ethers.utils.parseEther('0.0005')
  explorer = 'https://polygonscan.com'
  chainId = 137
}

// Set up wallet.
const privateKey = process.env.TEST_PRIVATE_KEY || ''

const deployedContractAddress = '0x565c27f073b3de60482cd7f199df6fd3ef7855c2'

const wallet = new ethers.Wallet(privateKey, ethers.provider)
const randomEmitter = new ethers.Contract(
  deployedContractAddress,
  Contract.abi,
  wallet,
)

const snooze = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms))

const main = async () => {
  const nonce = await ethers.provider.getTransactionCount(wallet.address)
  console.log(`${wallet.address} nonce: ${nonce.toString()}`)
  const randomNumberRequest = await randomEmitter.requestRandomNumber({
    gasPrice: 90000000000,
    nonce: nonce,
  })
  // const randomNumberRequest = await randomEmitter.returnLink({ gasLimit: 1000000 });
  console.log(`${explorer}/tx/${randomNumberRequest.hash}`)

  const tx = await randomNumberRequest.wait()

  const requestID = tx.events[3].args[0]

  await snooze(120000)

  console.log('Random number request tx hash: ', randomNumberRequest.hash)
  console.log('Random number request ID receipt: ', requestID)

  randomEmitter.on('RandomNumber', async (randomNumber) => {
    console.log(`Fire Event`)
    console.log(`Random number is ${randomNumber}`)
  })

  await snooze(60000)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
