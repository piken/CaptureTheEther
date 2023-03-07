require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config({ path: __dirname + '/.env' });
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.4.21",
      },
      {
        version: "0.8.19",
      },
    ],
  },
  mocha: {
    timeout: 600000 // ten minutes
  },
};
