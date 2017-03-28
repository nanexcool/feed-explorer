import React, { Component } from 'react';
import Feed from './Feed';
import web3Init from './web3';
import dapp from './vendor/ds-feeds';
//import token from './vendor/token';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  web3 = null;

  constructor() {
    super();
    this.state = {
      accounts: [],
      defaultAccount: null
    };
  }

  componentDidMount() {
    this.web3 = web3Init();

    this.web3.eth.getAccounts((e, a) => {
      if (!this.web3.eth.defaultAccount) {
        this.web3.eth.defaultAccount = a[0];
      }
      this.setState({
        accounts: a,
        defaultAccount: a[0]
      });
    })
    window.web3 = this.web3;
    window.dapp = dapp;
    dapp.class(this.web3, 'internal');
    //token.class(this.web3, 'internal');
    //window.token = token;
  }

  render() {
    const accounts = this.state.accounts.map((account) => <li key={account}>{account}</li>);
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
