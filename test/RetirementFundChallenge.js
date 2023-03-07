const { expect } = require("chai");
const { ethers } = require("hardhat");
const {
    constants,
    expectRevert,
} = require('@openzeppelin/test-helpers');
require('dotenv').config({ path: __dirname + '/.env' });

const hre = require("hardhat");
describe("Retirement Fund Challenge", function() {
    beforeEach(async function() {
        [owner, player] = await ethers.getSigners();
        contract = await (await ethers.getContractFactory("RetirementFundChallenge")).deploy(player.address, {value: ethers.utils.parseEther("1.0")});
        await contract.deployed();

        attacker = await (await ethers.getContractFactory("RetirementFundAttack")).deploy(contract.address, {value: 1});
        await attacker.deployed();

});
    describe("Complete Challenge", function() {
        it("Should complete the challenge", async function() {
            await attacker.attack();
            await contract.connect(player).collectPenalty();
            expect(await contract.isComplete()).to.equal(true);
        });
    });
});