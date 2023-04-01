require("@nomicfoundation/hardhat-toolbox");
require('dotenv/config')

/** @type import('hardhat/config').HardhatUserConfig */

const { POLYGON_MUMBAI_RPC_PROVIDER, PRIVATE_KEY, POLYGONSCAN_API_KEY } = process.env;

module.exports = {
  solidity: "0.8.18",
  defaultNetwork: "mumbai",
  networks: {
      hardhat: {},
      mumbai: {
         url: POLYGON_MUMBAI_RPC_PROVIDER,
         accounts: [`0x${PRIVATE_KEY}`],
     }
  },
  etherscan: {
     apiKey: POLYGONSCAN_API_KEY,
  }
};
