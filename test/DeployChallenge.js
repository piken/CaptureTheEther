const { expect } = require("chai");
const { ethers } = require("hardhat");
const {
    constants,
    expectRevert,
} = require('@openzeppelin/test-helpers');
require('dotenv').config({ path: __dirname + '/.env' });

const hre = require("hardhat");
describe("Deploy Challenge", function() {
    beforeEach(async function() {
        [player] = await ethers.getSigners();
        contract = await (await ethers.getContractFactory("DeployChallenge")).deploy();
        await contract.deployed();
});
    describe("Complete Challenge", function() {
        it("Should complete the challenge", async function() {
            expect(await contract.isComplete()).to.equal(true);
        });
    });
});