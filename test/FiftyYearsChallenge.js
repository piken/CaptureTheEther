const { expect } = require("chai");
const { ethers } = require("hardhat");
const {
    constants,
    expectRevert,
} = require('@openzeppelin/test-helpers');
require('dotenv').config({ path: __dirname + '/.env' });

const hre = require("hardhat");
describe("Fifty Years Challenge", function() {
    beforeEach(async function() {
        [player] = await ethers.getSigners();
        contract = await (await ethers.getContractFactory("FiftyYearsChallenge")).deploy(player.address, {value: ethers.utils.parseEther("1.0")});
        await contract.deployed();

});
    describe("Complete Challenge", function() {
        it("Should complete the challenge", async function() {
            queueSlot = ethers.BigNumber.from(ethers.utils.solidityKeccak256(["uint"], [0]));
            secondTime = ethers.constants.MaxUint256.sub(86400).add(1);
            await contract.upsert(10, secondTime, {value: 1});
            await contract.upsert(10, 0, {value:1});
            await contract.withdraw(1);
            expect(await contract.isComplete()).to.equal(true);
        });
    });
});