const Web3 = require('web3')
const web3 = new Web3("ws://localhost:7545");
// web3.setProvider(new web3.providers.HttpProvider());

export default web3
