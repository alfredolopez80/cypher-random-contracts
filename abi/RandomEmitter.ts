export const Contract = {
	"abi": [
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_vrfCoordinator",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "_linkToken",
					"type": "address"
				},
				{
					"internalType": "bytes32",
					"name": "_keyHash",
					"type": "bytes32"
				},
				{
					"internalType": "uint256",
					"name": "_fee",
					"type": "uint256"
				}
			],
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "oldFee",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "newFee",
					"type": "uint256"
				}
			],
			"name": "ChgFee",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "randomNumber",
					"type": "uint256"
				}
			],
			"name": "RandomNumber",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "bytes32",
					"name": "requestId",
					"type": "bytes32"
				}
			],
			"name": "Request",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}
			],
			"name": "ReturnLink",
			"type": "event"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_fee",
					"type": "uint256"
				}
			],
			"name": "chgFee",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "contractNumber",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "currentRequestId",
			"outputs": [
				{
					"internalType": "bytes32",
					"name": "",
					"type": "bytes32"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "getFee",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "_fee",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "owner",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bytes32",
					"name": "requestId",
					"type": "bytes32"
				},
				{
					"internalType": "uint256",
					"name": "randomness",
					"type": "uint256"
				}
			],
			"name": "rawFulfillRandomness",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "requestRandomNumber",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "returnLink",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		}
	]
}
