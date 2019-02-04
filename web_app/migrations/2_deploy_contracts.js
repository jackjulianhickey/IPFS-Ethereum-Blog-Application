var BlogStorage = artifacts.require("./contracts/BlogStorage.sol");

module.exports = function(deployer) {
  deployer.deploy(BlogStorage);
};
