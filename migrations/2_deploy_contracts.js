const Blockchase = artifacts.require("Blockchase");

module.exports = function(deployer) {
  deployer.deploy(Blockchase, 10, 300, 300);
};