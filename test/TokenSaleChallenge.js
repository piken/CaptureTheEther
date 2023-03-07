const { expect } = require("chai");
const { ethers } = require("hardhat");
const {
    constants,
    expectRevert,
} = require('@openzeppelin/test-helpers');
require('dotenv').config({ path: __dirname + '/.env' });

const hre = require("hardhat");
describe("Token Sale Challenge", function() {
    beforeEach(async function() {
        [player] = await ethers.getSigners();
        contract = await (await ethers.getContractFactory("TokenSaleChallenge")).deploy(player.address, {value: ethers.utils.parseEther("1.0")});
        await contract.deployed();

        hacker = await (await ethers.getContractFactory("TokenSaleAttack")).deploy(contract.address);
        await hacker.deployed();
});
    describe("Complete Challenge", function() {
        it("Should complete the challenge", async function() {
            await hacker.attack({value: ethers.utils.parseEther("1.0")});
            expect(await contract.isComplete()).to.equal(true);
        });
    });
});