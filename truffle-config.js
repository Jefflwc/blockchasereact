const path = require("path");
const { settings } = require("cluster");

const HDWalletProvider = require("@truffle/hdwallet-provider");
const privateKey = "e1f78925b527467ab69cc6c1b860152a453ef1ef1024bbc563d4c178dfc573fc";
const endpointUrl = "https://ropsten.infura.io/v3/9be692ab799b41d5b751228f326dbcd8";

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "/src/contracts"),
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "5777",
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(
          //private keys array
          [privateKey],
          //url to ethereum node
          endpointUrl
        )
      },
      gas: 5000000,
      gasPrice: 25000000000,
      network_id: 3
    }
  },
  compilers: {
    solc: {
      version: "^0.8.4",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }
  }
};
