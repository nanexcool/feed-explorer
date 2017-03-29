/* eslint-disable */

// For geth
if (typeof dapp === 'undefined') {
  var dapp = {};
}

if (typeof web3 === 'undefined' && typeof Web3 === 'undefined') {
  var Web3 = require('web3');
}

dapp['ds-feeds'] = (function builder () {
  var environments = {
  "internal": {},
  "kovan": {},
  "live": {}
};

  function ContractWrapper (headers, _web3) {
    if (!_web3) {
      throw new Error('Must supply a Web3 connection!');
    }

    this.headers = headers;
    this._class = _web3.eth.contract(headers.interface);
  }

  ContractWrapper.prototype.deploy = function () {
    var args = new Array(arguments)[0];
    args[args.length - 1].data = this.headers.bytecode;
    args[args.length - 1].gas = 3000000;
    return this._class.new.apply(this._class, args);
  };

  var passthroughs = ['at', 'new'];
  for (var i = 0; i < passthroughs.length; i += 1) {
    ContractWrapper.prototype[passthroughs[i]] = (function (passthrough) {
      return function () {
        return this._class[passthrough].apply(this._class, arguments);
      };
    })(passthroughs[i]);
  }

  function constructor (_web3, env) {
    if (!env) {
      env = {
  "objects": {},
  "type": "internal"
};
    }
    if(typeof env === "object" && !("objects" in env)) {
      env = {objects: env};
    }
    while (typeof env !== 'object') {
      if (!(env in environments)) {
        throw new Error('Cannot resolve environment name: ' + env);
      }
      env = {objects: environments[env]};
    }

    if (typeof _web3 === 'undefined') {
      if (!env.rpcURL) {
        throw new Error('Need either a Web3 instance or an RPC URL!');
      }
      _web3 = new Web3(new Web3.providers.HttpProvider(env.rpcURL));
    }

    this.headers = {
      "DSFeeds": {
        "interface": [
          {
            "constant": true,
            "inputs": [
              {
                "name": "id",
                "type": "bytes12"
              }
            ],
            "name": "expired",
            "outputs": [
              {
                "name": "",
                "type": "bool"
              }
            ],
            "payable": false,
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "id",
                "type": "bytes12"
              },
              {
                "name": "value",
                "type": "bytes32"
              },
              {
                "name": "expiration",
                "type": "uint40"
              }
            ],
            "name": "set",
            "outputs": [],
            "payable": false,
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [],
            "name": "claim",
            "outputs": [
              {
                "name": "id",
                "type": "bytes12"
              }
            ],
            "payable": false,
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "id",
                "type": "bytes12"
              },
              {
                "name": "label",
                "type": "bytes32"
              }
            ],
            "name": "set_label",
            "outputs": [],
            "payable": false,
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "id",
                "type": "bytes12"
              }
            ],
            "name": "owner",
            "outputs": [
              {
                "name": "",
                "type": "address"
              }
            ],
            "payable": false,
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "id",
                "type": "bytes12"
              }
            ],
            "name": "expiration",
            "outputs": [
              {
                "name": "",
                "type": "uint40"
              }
            ],
            "payable": false,
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "id",
                "type": "bytes12"
              },
              {
                "name": "value",
                "type": "bytes32"
              }
            ],
            "name": "set",
            "outputs": [],
            "payable": false,
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "id",
                "type": "bytes12"
              }
            ],
            "name": "timestamp",
            "outputs": [
              {
                "name": "",
                "type": "uint40"
              }
            ],
            "payable": false,
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "id",
                "type": "bytes12"
              }
            ],
            "name": "label",
            "outputs": [
              {
                "name": "",
                "type": "bytes32"
              }
            ],
            "payable": false,
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "id",
                "type": "bytes12"
              }
            ],
            "name": "peek",
            "outputs": [
              {
                "name": "",
                "type": "bool"
              }
            ],
            "payable": false,
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "id",
                "type": "bytes12"
              }
            ],
            "name": "read",
            "outputs": [
              {
                "name": "value",
                "type": "bytes32"
              }
            ],
            "payable": false,
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "id",
                "type": "bytes12"
              },
              {
                "name": "owner",
                "type": "address"
              }
            ],
            "name": "set_owner",
            "outputs": [],
            "payable": false,
            "type": "function"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "name": "id",
                "type": "bytes12"
              },
              {
                "indexed": false,
                "name": "owner",
                "type": "address"
              }
            ],
            "name": "LogClaim",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "name": "id",
                "type": "bytes12"
              },
              {
                "indexed": false,
                "name": "value",
                "type": "bytes32"
              },
              {
                "indexed": false,
                "name": "expiration",
                "type": "uint40"
              }
            ],
            "name": "LogSet",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "name": "id",
                "type": "bytes12"
              },
              {
                "indexed": false,
                "name": "owner",
                "type": "address"
              }
            ],
            "name": "LogSetOwner",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "name": "id",
                "type": "bytes12"
              },
              {
                "indexed": false,
                "name": "label",
                "type": "bytes32"
              }
            ],
            "name": "LogSetLabel",
            "type": "event"
          }
        ],
        "bytecode": "6060604052600180546001606060020a03191681179055341561001e57fe5b5b6106f58061002e6000396000f3006060604052361561009e5763ffffffff60e060020a6000350416632020296581146100a05780633f29cd27146100d15780634e71d92d146100fd578063770eb5bb1461012a5780638981d5131461014c578063a160bdf514610185578063a69a5588146101bc578063a99ffb7b146101de578063ac016a3114610215578063b47a2f1014610244578063ba22e56214610275578063c9085820146102a4575bfe5b34156100a857fe5b6100bd600160a060020a0319600435166102cf565b604080519115158252519081900360200190f35b34156100d957fe5b6100fb600160a060020a03196004351660243564ffffffffff604435166102fa565b005b341561010557fe5b61010d6103d9565b60408051600160a060020a03199092168252519081900360200190f35b341561013257fe5b6100fb600160a060020a031960043516602435610485565b005b341561015457fe5b610169600160a060020a031960043516610504565b60408051600160a060020a039092168252519081900360200190f35b341561018d57fe5b6101a2600160a060020a03196004351661052d565b6040805164ffffffffff9092168252519081900360200190f35b34156101c457fe5b6100fb600160a060020a031960043516602435610560565b005b34156101e657fe5b6101a2600160a060020a031960043516610572565b6040805164ffffffffff9092168252519081900360200190f35b341561021d57fe5b610232600160a060020a03196004351661059c565b60408051918252519081900360200190f35b341561024c57fe5b6100bd600160a060020a0319600435166105bf565b604080519115158252519081900360200190f35b341561027d57fe5b610232600160a060020a0319600435166105d3565b60408051918252519081900360200190f35b34156102ac57fe5b6100fb600160a060020a031960043516602435600160a060020a031661060f565b005b60006102da8261052d565b64ffffffffff166102e961069e565b64ffffffffff16101590505b919050565b8261032061030782610504565b600160a060020a031633600160a060020a0316146106a3565b600160a060020a03198416600090815260208190526040902060020183905561034761069e565b600160a060020a0319851660008181526020818152604091829020600301805464ffffffffff191664ffffffffff9586161769ffffffffff0000000000191665010000000000958816958602179055815187815290810193909352805191927f90a633a4a2ae23be4c20dd1f7cfe2f504e94c72375b96ad676914f78b67cd228929081900390910190a25b5b50505050565b60015460a060020a026103f7600160a060020a0319821615156106a3565b6001805460a060020a80820281900483018102046bffffffffffffffffffffffff19909116179055600160a060020a0319808216600081815260208181526040918290208054600160a060020a0333169516851790558151938452905191927fff320af0a152725afb95a20a16c559e2324e0f998631b6892e0c1f3720415f49929081900390910190a25b90565b816104ab61030782610504565b600160a060020a031633600160a060020a0316146106a3565b600160a060020a0319831660008181526020818152604091829020600101859055815185815291517f66f3485fca28b64e1fb0ce419f2fe27fc84b3d02de3dd7edc449f5b35a1779029281900390910190a25b5b505050565b600160a060020a03198116600090815260208190526040902054600160a060020a03165b919050565b600160a060020a0319811660009081526020819052604090206003015465010000000000900464ffffffffff165b919050565b61056d82826000196102fa565b5b5050565b600160a060020a0319811660009081526020819052604090206003015464ffffffffff165b919050565b600160a060020a031981166000908152602081905260409020600101545b919050565b60006105cb33836106b4565b90505b919050565b60006105df33836106b4565b15156105eb5760006000fd5b50600160a060020a031981166000908152602081905260409020600201545b919050565b8161063561030782610504565b600160a060020a031633600160a060020a0316146106a3565b600160a060020a0319808416600081815260208181526040918290208054600160a060020a0388169516851790558151938452905191927ff9748c45e3ee6ce874c66a836fcc6267e8fb43966eec794f6cac34450256ab1d929081900390910190a25b5b505050565b425b90565b8015156106b05760006000fd5b5b50565b60006106bf826102cf565b1590505b929150505600a165627a7a72305820e28aaa7faf8a8743a189a66133db909825efe21d57bc018886ff6d244e807f740029"
      },
      "DSFeedsEvents": {
        "interface": [
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "name": "id",
                "type": "bytes12"
              },
              {
                "indexed": false,
                "name": "owner",
                "type": "address"
              }
            ],
            "name": "LogClaim",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "name": "id",
                "type": "bytes12"
              },
              {
                "indexed": false,
                "name": "value",
                "type": "bytes32"
              },
              {
                "indexed": false,
                "name": "expiration",
                "type": "uint40"
              }
            ],
            "name": "LogSet",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "name": "id",
                "type": "bytes12"
              },
              {
                "indexed": false,
                "name": "owner",
                "type": "address"
              }
            ],
            "name": "LogSetOwner",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "name": "id",
                "type": "bytes12"
              },
              {
                "indexed": false,
                "name": "label",
                "type": "bytes32"
              }
            ],
            "name": "LogSetLabel",
            "type": "event"
          }
        ],
        "bytecode": "60606040523415600b57fe5b5b60338060196000396000f30060606040525bfe00a165627a7a723058208846576f289d03ec9e4d79e1d0b47487e2bebe9c948c0bc180e18d9ef572715d0029"
      },
      "DSFeedsInterface": {
        "interface": [
          {
            "constant": false,
            "inputs": [
              {
                "name": "id",
                "type": "bytes12"
              },
              {
                "name": "value",
                "type": "bytes32"
              },
              {
                "name": "expiration",
                "type": "uint40"
              }
            ],
            "name": "set",
            "outputs": [],
            "payable": false,
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [],
            "name": "claim",
            "outputs": [
              {
                "name": "id",
                "type": "bytes12"
              }
            ],
            "payable": false,
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "id",
                "type": "bytes12"
              }
            ],
            "name": "peek",
            "outputs": [
              {
                "name": "ok",
                "type": "bool"
              }
            ],
            "payable": false,
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "id",
                "type": "bytes12"
              }
            ],
            "name": "read",
            "outputs": [
              {
                "name": "value",
                "type": "bytes32"
              }
            ],
            "payable": false,
            "type": "function"
          }
        ],
        "bytecode": ""
      },
      "ERC20": {
        "interface": [
          {
            "constant": false,
            "inputs": [
              {
                "name": "spender",
                "type": "address"
              },
              {
                "name": "value",
                "type": "uint256"
              }
            ],
            "name": "approve",
            "outputs": [
              {
                "name": "ok",
                "type": "bool"
              }
            ],
            "payable": false,
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "totalSupply",
            "outputs": [
              {
                "name": "supply",
                "type": "uint256"
              }
            ],
            "payable": false,
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "from",
                "type": "address"
              },
              {
                "name": "to",
                "type": "address"
              },
              {
                "name": "value",
                "type": "uint256"
              }
            ],
            "name": "transferFrom",
            "outputs": [
              {
                "name": "ok",
                "type": "bool"
              }
            ],
            "payable": false,
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "who",
                "type": "address"
              }
            ],
            "name": "balanceOf",
            "outputs": [
              {
                "name": "value",
                "type": "uint256"
              }
            ],
            "payable": false,
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "to",
                "type": "address"
              },
              {
                "name": "value",
                "type": "uint256"
              }
            ],
            "name": "transfer",
            "outputs": [
              {
                "name": "ok",
                "type": "bool"
              }
            ],
            "payable": false,
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "owner",
                "type": "address"
              },
              {
                "name": "spender",
                "type": "address"
              }
            ],
            "name": "allowance",
            "outputs": [
              {
                "name": "_allowance",
                "type": "uint256"
              }
            ],
            "payable": false,
            "type": "function"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "name": "from",
                "type": "address"
              },
              {
                "indexed": true,
                "name": "to",
                "type": "address"
              },
              {
                "indexed": false,
                "name": "value",
                "type": "uint256"
              }
            ],
            "name": "Transfer",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "name": "owner",
                "type": "address"
              },
              {
                "indexed": true,
                "name": "spender",
                "type": "address"
              },
              {
                "indexed": false,
                "name": "value",
                "type": "uint256"
              }
            ],
            "name": "Approval",
            "type": "event"
          }
        ],
        "bytecode": ""
      },
      "PaidDSFeeds": {
        "interface": [
          {
            "constant": false,
            "inputs": [
              {
                "name": "token",
                "type": "address"
              }
            ],
            "name": "claim",
            "outputs": [
              {
                "name": "id",
                "type": "bytes12"
              }
            ],
            "payable": false,
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "id",
                "type": "bytes12"
              }
            ],
            "name": "expired",
            "outputs": [
              {
                "name": "",
                "type": "bool"
              }
            ],
            "payable": false,
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "id",
                "type": "bytes12"
              }
            ],
            "name": "token",
            "outputs": [
              {
                "name": "",
                "type": "address"
              }
            ],
            "payable": false,
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "id",
                "type": "bytes12"
              },
              {
                "name": "value",
                "type": "bytes32"
              },
              {
                "name": "expiration",
                "type": "uint40"
              }
            ],
            "name": "set",
            "outputs": [],
            "payable": false,
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "id",
                "type": "bytes12"
              }
            ],
            "name": "unpaid",
            "outputs": [
              {
                "name": "",
                "type": "bool"
              }
            ],
            "payable": false,
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "user",
                "type": "address"
              },
              {
                "name": "id",
                "type": "bytes12"
              }
            ],
            "name": "pay",
            "outputs": [],
            "payable": false,
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [],
            "name": "claim",
            "outputs": [
              {
                "name": "id",
                "type": "bytes12"
              }
            ],
            "payable": false,
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "id",
                "type": "bytes12"
              },
              {
                "name": "price",
                "type": "uint256"
              }
            ],
            "name": "set_price",
            "outputs": [],
            "payable": false,
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "id",
                "type": "bytes12"
              },
              {
                "name": "label",
                "type": "bytes32"
              }
            ],
            "name": "set_label",
            "outputs": [],
            "payable": false,
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "id",
                "type": "bytes12"
              }
            ],
            "name": "owner",
            "outputs": [
              {
                "name": "",
                "type": "address"
              }
            ],
            "payable": false,
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "id",
                "type": "bytes12"
              }
            ],
            "name": "price",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "id",
                "type": "bytes12"
              }
            ],
            "name": "expiration",
            "outputs": [
              {
                "name": "",
                "type": "uint40"
              }
            ],
            "payable": false,
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "id",
                "type": "bytes12"
              },
              {
                "name": "value",
                "type": "bytes32"
              }
            ],
            "name": "set",
            "outputs": [],
            "payable": false,
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "id",
                "type": "bytes12"
              }
            ],
            "name": "timestamp",
            "outputs": [
              {
                "name": "",
                "type": "uint40"
              }
            ],
            "payable": false,
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "id",
                "type": "bytes12"
              }
            ],
            "name": "label",
            "outputs": [
              {
                "name": "",
                "type": "bytes32"
              }
            ],
            "payable": false,
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "id",
                "type": "bytes12"
              }
            ],
            "name": "peek",
            "outputs": [
              {
                "name": "",
                "type": "bool"
              }
            ],
            "payable": false,
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "id",
                "type": "bytes12"
              }
            ],
            "name": "read",
            "outputs": [
              {
                "name": "value",
                "type": "bytes32"
              }
            ],
            "payable": false,
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "id",
                "type": "bytes12"
              }
            ],
            "name": "free",
            "outputs": [
              {
                "name": "",
                "type": "bool"
              }
            ],
            "payable": false,
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "id",
                "type": "bytes12"
              },
              {
                "name": "owner",
                "type": "address"
              }
            ],
            "name": "set_owner",
            "outputs": [],
            "payable": false,
            "type": "function"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "name": "id",
                "type": "bytes12"
              },
              {
                "indexed": false,
                "name": "price",
                "type": "uint256"
              }
            ],
            "name": "LogSetPrice",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "name": "id",
                "type": "bytes12"
              },
              {
                "indexed": true,
                "name": "user",
                "type": "address"
              }
            ],
            "name": "LogPay",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "name": "id",
                "type": "bytes12"
              },
              {
                "indexed": false,
                "name": "owner",
                "type": "address"
              }
            ],
            "name": "LogClaim",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "name": "id",
                "type": "bytes12"
              },
              {
                "indexed": false,
                "name": "value",
                "type": "bytes32"
              },
              {
                "indexed": false,
                "name": "expiration",
                "type": "uint40"
              }
            ],
            "name": "LogSet",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "name": "id",
                "type": "bytes12"
              },
              {
                "indexed": false,
                "name": "owner",
                "type": "address"
              }
            ],
            "name": "LogSetOwner",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "name": "id",
                "type": "bytes12"
              },
              {
                "indexed": false,
                "name": "label",
                "type": "bytes32"
              }
            ],
            "name": "LogSetLabel",
            "type": "event"
          }
        ],
        "bytecode": "6060604052600180546001606060020a03191681179055341561001e57fe5b5b610c2f8061002e6000396000f300606060405236156100eb5763ffffffff60e060020a6000350416631e83409a81146100ed5780632020296514610126578063361b5eaa146101575780633f29cd27146101905780634a3e2b21146101bc5780634a729fe1146101ed5780634e71d92d1461021857806362a52ed614610245578063770eb5bb146102675780638981d513146102895780639a3ce541146102c2578063a160bdf5146102f1578063a69a558814610328578063a99ffb7b1461034a578063ac016a3114610381578063b47a2f10146103b0578063ba22e562146103e1578063c614da6714610410578063c908582014610441575bfe5b34156100f557fe5b610109600160a060020a036004351661046c565b60408051600160a060020a03199092168252519081900360200190f35b341561012e57fe5b610143600160a060020a0319600435166104aa565b604080519115158252519081900360200190f35b341561015f57fe5b610174600160a060020a0319600435166104d5565b60408051600160a060020a039092168252519081900360200190f35b341561019857fe5b6101ba600160a060020a03196004351660243564ffffffffff604435166104fe565b005b34156101c457fe5b610143600160a060020a031960043516610543565b604080519115158252519081900360200190f35b34156101f557fe5b6101ba600160a060020a0360043516600160a060020a03196024351661056a565b005b341561022057fe5b61010961069b565b60408051600160a060020a03199092168252519081900360200190f35b341561024d57fe5b6101ba600160a060020a031960043516602435610747565b005b341561026f57fe5b6101ba600160a060020a0319600435166024356107da565b005b341561029157fe5b610174600160a060020a031960043516610859565b60408051600160a060020a039092168252519081900360200190f35b34156102ca57fe5b6102df600160a060020a031960043516610882565b60408051918252519081900360200190f35b34156102f957fe5b61030e600160a060020a0319600435166108a5565b6040805164ffffffffff9092168252519081900360200190f35b341561033057fe5b6101ba600160a060020a0319600435166024356108d8565b005b341561035257fe5b61030e600160a060020a0319600435166108ea565b6040805164ffffffffff9092168252519081900360200190f35b341561038957fe5b6102df600160a060020a031960043516610914565b60408051918252519081900360200190f35b34156103b857fe5b610143600160a060020a031960043516610937565b604080519115158252519081900360200190f35b34156103e957fe5b6102df600160a060020a03196004351661094b565b60408051918252519081900360200190f35b341561041857fe5b610143600160a060020a031960043516610987565b604080519115158252519081900360200190f35b341561044957fe5b6101ba600160a060020a031960043516602435600160a060020a03166109a5565b005b600061047661069b565b600160a060020a031981811660009081526002602052604090208054909116600160a060020a03851617905590505b919050565b60006104b5826108a5565b64ffffffffff166104c4610a34565b64ffffffffff16101590505b919050565b600160a060020a03198116600090815260026020526040902054600160a060020a03165b919050565b610509838383610a39565b61051283610987565b600160a060020a03198416600090815260026020819052604090912001805460ff191691159190911790555b505050565b600160a060020a031981166000908152600260208190526040909120015460ff165b919050565b61058730600160a060020a031633600160a060020a031614610b18565b600160a060020a031981166000818152600260208190526040808320909101805460ff1916905551600160a060020a03851692917f9d80096b676e42de6830e8a9256f4f9fdafb23527a99b51bcbc2ed719eb3ae3391a36106956105ea826104d5565b600160a060020a03166323b872dd8461060285610859565b61060b86610882565b6000604051602001526040518463ffffffff1660e060020a0281526004018084600160a060020a0316600160a060020a0316815260200183600160a060020a0316600160a060020a031681526020018281526020019350505050602060405180830381600087803b151561067b57fe5b60325a03f1151561068857fe5b5050604051519050610b18565b5b5b5050565b60015460a060020a026106b9600160a060020a031982161515610b18565b6001805460a060020a80820281900483018102046bffffffffffffffffffffffff19909116179055600160a060020a0319808216600081815260208181526040918290208054600160a060020a0333169516851790558151938452905191927fff320af0a152725afb95a20a16c559e2324e0f998631b6892e0c1f3720415f49929081900390910190a25b90565b8161076d61075482610859565b600160a060020a031633600160a060020a031614610b18565b61077f61077984610987565b15610b18565b600160a060020a03198316600081815260026020908152604091829020600101859055815185815291517f787069bab7c2ae49c1ac37620b4eae6872cafed41e29cc8e3dc1fed0d21501499281900390910190a25b5b505050565b8161080061075482610859565b600160a060020a031633600160a060020a031614610b18565b600160a060020a0319831660008181526020818152604091829020600101859055815185815291517f66f3485fca28b64e1fb0ce419f2fe27fc84b3d02de3dd7edc449f5b35a1779029281900390910190a25b5b505050565b600160a060020a03198116600090815260208190526040902054600160a060020a03165b919050565b600160a060020a031981166000908152600260205260409020600101545b919050565b600160a060020a0319811660009081526020819052604090206003015465010000000000900464ffffffffff165b919050565b61069582826000196104fe565b5b5050565b600160a060020a0319811660009081526020819052604090206003015464ffffffffff165b919050565b600160a060020a031981166000908152602081905260409020600101545b919050565b60006109433383610b29565b90505b919050565b60006109573383610b29565b15156109635760006000fd5b50600160a060020a031981166000908152602081905260409020600201545b919050565b600080610993836104d5565b600160a060020a03161490505b919050565b816109cb61075482610859565b600160a060020a031633600160a060020a031614610b18565b600160a060020a0319808416600081815260208181526040918290208054600160a060020a0388169516851790558151938452905191927ff9748c45e3ee6ce874c66a836fcc6267e8fb43966eec794f6cac34450256ab1d929081900390910190a25b5b505050565b425b90565b82610a5f61075482610859565b600160a060020a031633600160a060020a031614610b18565b600160a060020a031984166000908152602081905260409020600201839055610a86610a34565b600160a060020a0319851660008181526020818152604091829020600301805464ffffffffff191664ffffffffff9586161769ffffffffff0000000000191665010000000000958816958602179055815187815290810193909352805191927f90a633a4a2ae23be4c20dd1f7cfe2f504e94c72375b96ad676914f78b67cd228929081900390910190a25b5b50505050565b801515610b255760006000fd5b5b50565b6000610b34826104aa565b15610b4157506000610b64565b610b4a82610543565b15610b6057610b598383610b6c565b9050610b64565b5060015b5b5b92915050565b604080517f70617928616464726573732c62797465733132290000000000000000000000008152815190819003601401812063ffffffff60e060020a808304918216028352600160a060020a038681166004850152600160a060020a031986166024850152935160009492933093909316926044808201928792909190829003018183876161da5a03f194505050505b50929150505600a165627a7a72305820dd67b14d21f6949b9a3efb8c4da4f2e006e4ae9cdd886ef63c46142e31fefa760029"
      },
      "PaidDSFeedsEvents": {
        "interface": [
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "name": "id",
                "type": "bytes12"
              },
              {
                "indexed": false,
                "name": "price",
                "type": "uint256"
              }
            ],
            "name": "LogSetPrice",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "name": "id",
                "type": "bytes12"
              },
              {
                "indexed": true,
                "name": "user",
                "type": "address"
              }
            ],
            "name": "LogPay",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "name": "id",
                "type": "bytes12"
              },
              {
                "indexed": false,
                "name": "owner",
                "type": "address"
              }
            ],
            "name": "LogClaim",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "name": "id",
                "type": "bytes12"
              },
              {
                "indexed": false,
                "name": "value",
                "type": "bytes32"
              },
              {
                "indexed": false,
                "name": "expiration",
                "type": "uint40"
              }
            ],
            "name": "LogSet",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "name": "id",
                "type": "bytes12"
              },
              {
                "indexed": false,
                "name": "owner",
                "type": "address"
              }
            ],
            "name": "LogSetOwner",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "name": "id",
                "type": "bytes12"
              },
              {
                "indexed": false,
                "name": "label",
                "type": "bytes32"
              }
            ],
            "name": "LogSetLabel",
            "type": "event"
          }
        ],
        "bytecode": "60606040523415600b57fe5b5b60338060196000396000f30060606040525bfe00a165627a7a72305820aba5676f5643289e5e60e192ef52c3d443cb35bf85abcd6df634b11dd35f7cf40029"
      },
    };

    this.classes = {};
    for (var key in this.headers) {
      this.classes[key] = new ContractWrapper(this.headers[key], _web3);
    }

    this.objects = {};
    for (var i in env.objects) {
      var obj = env.objects[i];
      if(!(obj['type'].split('[')[0] in this.classes)) continue;
      this.objects[i] = this.classes[obj['type'].split('[')[0]].at(obj.value);
    }
  }

  return {
    class: constructor,
    environments: environments
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = dapp['ds-feeds'];
}
