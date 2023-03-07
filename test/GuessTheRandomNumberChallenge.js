const { expect } = require("chai");
const { ethers } = require("hardhat");
const {
    constants,
    expectRevert,
} = require('@openzeppelin/test-helpers');
require('dotenv').config({ path: __dirname + '/.env' });

const hre = require("hardhat");
describe("Guess The Random Number Challenge", function() {
    beforeEach(async function() {
        [player] = await ethers.getSigners();
        contract = await (await ethers.getContractFactory("GuessTheRandomNumberChallenge")).deploy({value: ethers.utils.parseEther("1.0")});
        await contract.deployed();
});
    describe("Complete Challenge", function() {
        it("Should complete the challenge", async function() {
            n = ethers.provider.getStorageAt(contract.address, 0);
            await contract.guess(n, {value: ethers.utils.parseEther("1.0")});
            expect(await contract.isComplete()).to.equal(true);
        });
    });
});