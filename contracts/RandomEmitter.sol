// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;
import "@chainlink/contracts/src/v0.8/interfaces/LinkTokenInterface.sol";
import "@chainlink/contracts/src/v0.8/dev/VRFConsumerBase.sol";

contract RandomEmitter is VRFConsumerBase {
    uint256 public contractNumber = 0;
    address public owner;

    bytes32 internal keyHash;
	uint256 internal fee;
    bytes32 public currentRequestId;

    event Request(bytes32 requestId);
    event RandomNumber(uint256 randomNumber);
    event ReturnLink(uint256 amount);
	// Event when change the fee value for Interaction with Chainlink Oracle
	event ChgFee(uint256 oldFee, uint256 newFee);

    constructor(
        address _vrfCoordinator,
        address _linkToken,
        bytes32 _keyHash,
		uint256 _fee
    ) VRFConsumerBase(_vrfCoordinator, _linkToken) {
        owner = msg.sender;
        keyHash = _keyHash;
		fee = _fee;
    }

    /// @dev Sends a random number request to the Chainlink VRF system.
    function requestRandomNumber() external {
        require(
            msg.sender == owner,
            "Only the owner can request for a random number."
        );
        currentRequestId = requestRandomness(keyHash, fee);
        emit Request(currentRequestId);
    }

    /// @dev Called by Chainlink VRF random number provider.
    function fulfillRandomness(bytes32 requestId, uint256 randomness)
        internal
        override
    {
        require(requestId == currentRequestId, "The requestId is invalid.");

        contractNumber = randomness;

        emit RandomNumber(randomness);
    }

    function returnLink() external {
        require(
            msg.sender == owner,
            "Only the owner can request to be re-paid link tokens."
        );
        uint256 currentBalance = LINK.balanceOf(address(this));

        LINK.transfer(owner, currentBalance);
        emit ReturnLink(currentBalance);
    }

	/**
	 * @dev change the LINK fee of the contract
	 * @param _fee new LINK fee of the contract
	 */
	function getFee() public view returns (uint256 _fee) {
		require(
            msg.sender == owner,
            "Only the owner can get the actual fee."
        );
		_fee = fee;
	}

	/**
	 * @dev change the LINK fee of the contract
	 * @param _fee new LINK fee of the contract
	 */
	function chgFee(uint256 _fee) public  {
		require(
            msg.sender == owner,
            "Only the owner can change de Fee."
        );
		uint256 _oldFee = fee;
		fee = _fee;
		emit ChgFee(_oldFee, _fee);
	}
}
