// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "@chainlink/contracts/src/v0.8/interfaces/LinkTokenInterface.sol";

import "@chainlink/contracts/src/v0.8/dev/VRFConsumerBase.sol";

contract RandomEmitter is VRFConsumerBase {
    uint256 public contractNumber = 0;
    address public owner;

    bytes32 internal keyHash;
    bytes32 public currentRequestId;

    event Request(bytes32 requestId);
    event RandomNumber(uint256 randomNumber);
    event ReturnLink(uint256 amount);

    constructor(
        address _vrfCoordinator,
        address _linkToken,
        bytes32 _keyHash
    ) VRFConsumerBase(_vrfCoordinator, _linkToken) {
        owner = msg.sender;
        keyHash = _keyHash;
    }

    /// @dev Sends a random number request to the Chainlink VRF system.
    function requestRandomNumber() external {
        require(
            msg.sender == owner,
            "Only the owner can request for a random number."
        );
        currentRequestId = requestRandomness(keyHash, 0.1 ether);
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
}
