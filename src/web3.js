import Web3 from 'web3';

let web3Instance = null;

let web3 = () => {
    const isManaged = typeof(window.web3) === "object";
    if (!web3Instance) {
        web3Instance = !isManaged ? new Web3(window.web3.currentProvider) : 
            new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        console.log('web3');
    }
    return web3Instance;
}

export default web3;
