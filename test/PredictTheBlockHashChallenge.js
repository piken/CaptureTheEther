const { expect } = require("chai");
const { ethers } = require("hardhat");
const {
    constants,
    expectRevert,
} = require('@openzeppelin/test-helpers');
require('dotenv').config({ path: __dirname + '/.env' });

const hre = require("hardhat");
const blockHash = "0x0000000000000000000000000000000000000000000000000000000000000000";
describe("Predict The BlockHash Challenge", function() {
    beforeEach(async function() {
        [player] = await ethers.getSigners();
        contract = await (await ethers.getContractFactory("PredictTheBlockHashChallenge")).deploy({value: ethers.utils.parseEther("1.0")});
        await contract.deployed();

});
    describe("Complete Challenge", function() {
        it("Should complete the challenge", async function() {
            await contract.lockInGuess(blockHash, {value: ethers.utils.parseEther("1.0")});
            await ethers.provider.send("hardhat_mine", ["0x101"]);
            await contract.settle();
            expect(await contract.isComplete()).to.equal(true);
        });
    });
});