import Web3 from 'web3';

let web3 = null;

const isManaged = typeof (window.web3) === "object";
if (!web3) {
  web3 = isManaged ? new Web3(window.web3.currentProvider) :
    new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  console.log(isManaged ? 'Reusing current web3 provider.' : 'Using provider located at localhost:8545');
}

export default web3;

const init = () => {
  const isManaged = typeof (window.web3) === "object";
  if (!web3) {
    web3 = isManaged ? new Web3(window.web3.currentProvider) :
      new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    console.log(isManaged ? 'Reusing current web3 provider.' : 'Using provider located at localhost:8545');
  }
  return web3;
}

export { init };
