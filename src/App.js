import React, { Component } from 'react';
import Feed from './Feed';
import web3 from './web3';
import dapp from './vendor/ds-feeds';

import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      network: {
        syncing: null,
        startingBlock: null,
        currentBlock: null,
        highestBlock: null,
        latestBlock: null,
        outOfSync: null,
        isConnected: null,
        network: null,
        accounts: [],
        defaultAccount: null
      },
      accounts: [],
      defaultAccount: null
    };

    this.checkNetwork = this.checkNetwork.bind(this);
    this.initNetwork = this.initNetwork.bind(this);
    this.checkAccounts = this.checkAccounts.bind(this);
  }

  componentDidMount() {
    this.checkNetwork();
    this.checkAccounts();

    this.checkAccountsInterval = setInterval(this.checkAccounts, 10000);
    this.checkNetworkInterval = setInterval(this.checkNetwork, 3000);

    window.web3 = web3;
    window.dapp = dapp;

    web3.eth.isSyncing((error, sync) => {
      console.log('isSyncing', error, sync);
      if (!error) {
        const networkState = {...this.state.network};
        networkState['syncing'] = (sync !== false);
        this.setState({ network: networkState });

        // Stop all app activity
        if (sync === true) {
          // We use `true`, so it stops all filters, but not the web3.eth.syncing polling
          web3.reset(true);
          //this.checkNetwork();
        // show sync info
        } else if (sync) {
          const networkState = {...this.state.network};
          networkState['startingBlock'] = sync.startingBlock;
          networkState['currentBlock'] = sync.currentBlock;
          networkState['highestBlock'] = sync.highestBlock;
          this.setState({ network: networkState });
        } else {
          const networkState = {...this.state.network};
          networkState['outOfSync'] = false;
          this.setState({ network: networkState });
        }
      }
    });
  }

  componentWillUnmount() {
    clearInterval(this.checkAccountsInterval);
    clearInterval(this.checkNetworkInterval);
  }

  checkNetwork() {
    web3.version.getNode((error) => {
      const isConnected = !error;

      // Check if we are synced
      if (isConnected) {
        web3.eth.getBlock('latest', (e, block) => {
          if (typeof(block) === 'undefined') {
            console.debug('YIKES! getBlock returned undefined!');
          }
          if (block.number >= this.state.network.latestBlock) {
            const networkState = {...this.state.network};
            networkState['latestBlock'] = block.number;
            networkState['outOfSync'] = e != null || ((new Date().getTime() / 1000) - block.timestamp) > 600;
            this.setState({ network: networkState });
          } else {
            // XXX MetaMask frequently returns old blocks
            // https://github.com/MetaMask/metamask-plugin/issues/504
            console.debug('Skipping old block');
          }
        });
      }

      // Check which network are we connected to
      // https://github.com/ethereum/meteor-dapp-wallet/blob/90ad8148d042ef7c28610115e97acfa6449442e3/app/client/lib/ethereum/walletInterface.js#L32-L46
      if (this.state.network.isConnected !== isConnected) {
        if (isConnected === true) {
          web3.eth.getBlock(0, (e, res) => {
            let network = false;
            if (!e) {
              switch (res.hash) {
                case '0xa3c565fc15c7478862d50ccd6561e3c06b24cc509bf388941c25ea985ce32cb9':
                  network = 'kovan';
                  break;
                case '0xd4e56740f876aef8c010b86a40d5f56745a118d0906a34e69aec8c0db1cb8fa3':
                  network = 'live';
                  break;
                default:
                  console.log('setting network to private');
                  console.log('res.hash:', res.hash);
                  network = 'internal';
              }
              dapp.class(web3, network);
            }
            if (this.state.network.network !== network) {
              this.initNetwork(network);
            }
          });
        } else {
          const networkState = {...this.state.network};
          networkState['isConnected'] = isConnected;
          networkState['network'] = false;
          networkState['latestBlock'] = 0;
          this.setState({ network: networkState });
        }
      }
    });
  }

  initNetwork(newNetwork) {
    //checkAccounts();
    const networkState = {...this.state.network};
    networkState['network'] = newNetwork;
    networkState['isConnected'] = true;
    networkState['latestBlock'] = 0;
    this.setState({ network: networkState });

    //this.initContracts();
  }

  checkAccounts() {
    web3.eth.getAccounts((error, accounts) => {
      if (!error) {
        const networkState = {...this.state.network};
        networkState['accounts'] = accounts;
        networkState['defaultAccount'] = accounts[0];
        web3.eth.defaultAccount = accounts[0];
        this.setState({ network: networkState });
      }
    });
  }

  render() {
    const accounts = this.state.network.accounts;//.map((account) => <li key={account}>{account}</li>);
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Feed name={'My Feed'} />
        {accounts}
      </div>
    );
  }
}

export default App;

console.debug('This is Feed Explorer.');
console.debug('You can play around with the `dapp` object.');
