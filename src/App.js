import React, { Component } from 'react';
import Feed from './Feed';
import web3Init from './web3';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  web3 = null;

  constructor() {
    super();
    this.state = {
      accounts: []
    };
  }

  componentDidMount() {
    this.web3 = web3Init();

    this.web3.eth.getAccounts((e, a) => {
      this.setState({
        accounts: a
      });
    })

    window.web3 = this.web3;
  }

  render() {
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
        {this.state.accounts}
      </div>
    );
  }
}

export default App;

console.debug('This is Feed Explorer.');
console.debug('You can play around with the `dapp` object.');
