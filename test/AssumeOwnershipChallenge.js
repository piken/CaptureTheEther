const { expect } = require("chai");
const { ethers } = require("hardhat");
const {
    constants,
    expectRevert,
} = require('@openzeppelin/test-helpers');
require('dotenv').config({ path: __dirname + '/.env' });

const hre = require("hardhat");
describe("Assume Ownership Challenge", function() {
    beforeEach(async function() {
        [player, attacker] = await ethers.getSigners();
        contract = await (await ethers.getContractFactory("AssumeOwnershipChallenge")).deploy();
        await contract.deployed();
});
    describe("Complete Challenge", function() {
        it("Should complete the challenge", async function() {
            await contract.connect(attacker).AssumeOwmershipChallenge();
            await contract.connect(attacker).authenticate();
            expect(await contract.isComplete()).to.equal(true);
        });
    });
});