var BlogStorage = artifacts.require("./contracts/BlogStorage.sol");
var Login = artifacts.require("./contracts/Login.sol");

module.exports = function(deployer) {
  deployer.deploy(BlogStorage);
  deployer.deploy(Login);
};
