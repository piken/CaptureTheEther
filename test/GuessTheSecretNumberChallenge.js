const { expect } = require("chai");
const { ethers } = require("hardhat");
const {
    constants,
    expectRevert,
} = require('@openzeppelin/test-helpers');
require('dotenv').config({ path: __dirname + '/.env' });

const hre = require("hardhat");
const answerHash = 0xdb81b4d58595fbbbb592d3661a34cdca14d7ab379441400cbfa1b78bc447c365;
describe("Guess The Secret Number Challenge", function() {
    beforeEach(async function() {
        [player] = await ethers.getSigners();
        contract = await (await ethers.getContractFactory("GuessTheSecretNumberChallenge")).deploy({value: ethers.utils.parseEther("1.0")});
        await contract.deployed();
});
    describe("Complete Challenge", function() {
        it("Should complete the challenge", async function() {

            for (i=0; i<255; i++) {
                hash = ethers.utils.keccak256(i);
                if (hash == answerHash) {
                    await contract.guess(i, {value: ethers.utils.parseEther("1.0")});
                    break;
                }
            }
            expect(await contract.isComplete()).to.equal(true);
        });
    });
});