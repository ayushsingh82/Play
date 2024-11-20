require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.19",
  networks: {
    codex: {
      url: "https://testnet.codex.storage",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 7700
    }
  }
}; 