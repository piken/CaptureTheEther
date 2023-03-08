const { expect } = require("chai");
const { ethers } = require("hardhat");
const {
    constants,
    expectRevert,
} = require('@openzeppelin/test-helpers');
require('dotenv').config({ path: __dirname + '/.env' });

const hre = require("hardhat");
describe("Fuzzy Identity Challenge", function() {
    beforeEach(async function() {
        [player] = await ethers.getSigners();
        contract = await (await ethers.getContractFactory("FuzzyIdentityChallenge")).deploy();
        await contract.deployed();
});
    describe("Complete Challenge", function() {
        it("Should complete the challenge", async function() {
            subString = "badc0de";
            //brutal force attack
            while (true) {
                wallet = new ethers.Wallet(ethers.utils.randomBytes(32), ethers.provider);//generate random wallet
                //calculate the address of the first smart deployed by random wallet
                contractAddr = ethers.utils.solidityKeccak256(["bytes1", "bytes1", "address", "bytes1"], [0xd6, 0x94, wallet.address, 0x80]).slice(26); 
                //check if the smart contract address has substring 
                if (contractAddr.includes(subString)) {
                    await player.sendTransaction({
                        to: wallet.address,
                        value: ethers.utils.parseEther("1.0")
                    });
                    NameContract = (await ethers.getContractFactory("NameContract")).connect(wallet);
                    attacker = await NameContract.deploy(contract.address);
                    await attacker.deployed();
                    console.log(attacker.address);
                    await attacker.attack();
                    expect(await contract.isComplete()).to.equal(true);
                }    
            }
        });
    });
});