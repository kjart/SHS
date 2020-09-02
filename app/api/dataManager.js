var dataManagerApiRoutes = require('express').Router();

var Web3 = require('web3');
var config = require('../config/config')
var request = require('request');

var web3;
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    console.log(web3.net.peerCount);
}

web3.eth.defaultAccount = web3.eth.coinbase;

var dataManagerContractAddress = config.dataManagerContractAddress;

// now contract interface
var dataManagerContractABI = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_deviceID",
				"type": "string"
			},
			{
				"name": "_hospitalDomainOwnerAddress",
				"type": "string"
			},
			{
				"name": "_trustScore",
				"type": "uint256"
			}
		],
		"name": "updateTrustScore",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_deviceID",
				"type": "string"
			},
			{
				"name": "_deviceName",
				"type": "string"
			},
			{
				"name": "_deviceType",
				"type": "string"
			},
			{
				"name": "_serialNumber",
				"type": "string"
			},
			{
				"name": "_hospitalDomainOwnerAddress",
				"type": "string"
			}
		],
		"name": "registerDevice",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_deviceID",
				"type": "string"
			},
			{
				"name": "_hospitalDomainOwnerAddress",
				"type": "string"
			}
		],
		"name": "getTrustScoreForDevice",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_deviceID",
				"type": "string"
			},
			{
				"name": "_deviceName",
				"type": "string"
			},
			{
				"name": "_deviceType",
				"type": "string"
			},
			{
				"name": "_serialNumber",
				"type": "string"
			},
			{
				"name": "_hospitalDomainOwnerAddress",
				"type": "string"
			}
		],
		"name": "updateDevice",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_deviceID",
				"type": "string"
			}
		],
		"name": "getDeviceDetails",
		"outputs": [
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_deviceID",
				"type": "string"
			},
			{
				"name": "_hospitalDomainOwnerAddress",
				"type": "string"
			}
		],
		"name": "requestDataResourceAccess",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_actionPerformed",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_deviceID",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_deviceName",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_deviceType",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_serialNumber",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_hospitalDomainOwnerAddress",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_timestamp",
				"type": "uint256"
			}
		],
		"name": "DeviceEvent",
		"type": "event"
	}
];

//now contract initiation
var dataManagerContract = web3.eth.contract(dataManagerContractABI).at(dataManagerContractAddress);

dataManagerApiRoutes.get('/', function(req, res) {

    res.send("Smart Health System API server");

});

dataManagerApiRoutes.post('/register/device', function(req, res) {

    var deviceID = req.body._deviceID;
    var deviceName = req.body._deviceName;
    var deviceType = req.body._deviceType;
    var serialNumber = req.body._serialNumber;
    var hospitalDomainOwnerAddress = req.body._hospitalDomainOwnerAddress;


    dataManagerContract.registerDevice.sendTransaction(deviceID, deviceName, deviceType, serialNumber, hospitalDomainOwnerAddress, {
        from: web3.eth.defaultAccount,
        gas: 9000000
    }, function(err, result) {
        console.log(result);
        if (!err) {

            res.json(result);
        } else
            res.status(401).json("Error" + err);
    });
});


dataManagerApiRoutes.post('/update/device', function(req, res) {

    var deviceID = req.body._deviceID;
    var deviceName = req.body._deviceName;
    var deviceType = req.body._deviceType;
    var serialNumber = req.body._serialNumber;
    var hospitalDomainOwnerAddress = req.body._hospitalDomainOwnerAddress;


    dataManagerContract.updateDevice.sendTransaction(deviceID, deviceName, deviceType, serialNumber, hospitalDomainOwnerAddress, {
        from: web3.eth.defaultAccount,
        gas: 9000000
    }, function(err, result) {
        console.log(result);
        if (!err) {

            res.json(result);
        } else
            res.status(401).json("Error" + err);
    });
});


dataManagerApiRoutes.post('/get/deviceDetails', function(req, res) {

    var deviceID = req.body._deviceID;

    dataManagerContract.getDeviceDetails.call(deviceID, function(err, result) {
        if (!err) {

            res.json({
            	"deviceName" : result[0],
            	"deviceType" : result[1],
            	"serialNumber" : result[2],
            	"hospitalDomainOwnerAddress" : result[3]
            });
        } else
        	res.status(401).json("Error" + err);
    });

})

dataManagerApiRoutes.post('/get/trustScore/device', function(req, res) {

    var deviceID = req.body._deviceID;
    var hospitalDomainOwnerAddress = req.body._hospitalDomainOwnerAddress;

    dataManagerContract.getTrustScoreForDevice.call(deviceID, hospitalDomainOwnerAddress, function(err, result) {
        if (!err) {

            res.json({
            	"trustScore" : result
            });
        } else
        	res.status(401).json("Error" + err);
    });

})

dataManagerApiRoutes.post('/update/trustScore', function(req, res) {

    var deviceID = req.body._deviceID;
    var hospitalDomainOwnerAddress = req.body._hospitalDomainOwnerAddress;
    var trustScore = req.body._trustScore;

    dataManagerContract.updateTrustScore.sendTransaction(deviceID, hospitalDomainOwnerAddress, trustScore, {
        from: web3.eth.defaultAccount,
        gas: 9000000
    }, function(err, result) {
        console.log(result);
        if (!err) {

            res.json(result);
        } else
            res.status(401).json("Error" + err);
    });
});

dataManagerApiRoutes.post('/request/dataResourceAccess', function(req, res) {

    var deviceID = req.body._deviceID;
    var hospitalDomainOwnerAddress = req.body._hospitalDomainOwnerAddress;

    dataManagerContract.requestDataResourceAccess.call(deviceID, hospitalDomainOwnerAddress, function(err, result) {
        if (!err) {

            res.json({
            	"accessStatus" : result
            });
        } else
        	res.status(401).json("Error" + err);
    });

})

dataManagerApiRoutes.get('/get/deviceLogs', function(req, res) {

    var deviceEvent = dataManagerContract.DeviceEvent({
        from: web3.eth.defaultAccount
    }, {
        fromBlock: 0,
        toBlock: 'latest'
    });

    deviceEvent.get(function(err, result) {
        //console.log(result);
        if (!err) {
        	var arrayLength = result.length;
            console.log(arrayLength)
            var processedArray = [];
            for (var i = 0; i < arrayLength; i++) {
            	
            		processedArray.push(

                        {

                            "address": result[i].address,
                            "blockNumber": result[i].blockNumber,
                            "transactionHash": result[i].transactionHash,
                            "blockHash": result[i].blockHash,
                            "actionPerformed": result[i].args._actionPerformed,
                            "deviceID": result[i].args._deviceID,
                            "deviceName": result[i].args._deviceName,
                            "deviceType": result[i].args._deviceType,
                            "serialNumber": result[i].args._serialNumber,
                            "hospitalDomainOwnerAddress": result[i].args._hospitalDomainOwnerAddress,
                            "timestamp" : result[i].args._timestamp
                        }

                    )

            }
            //console.log(response);
            res.json(processedArray);
        } else
            return res.json("Error" + err);
    });

})


dataManagerApiRoutes.post('/generate/blockchainIdentity/hospitalDomain', function(req, res) {


    var options = { method: 'POST',
  url: 'http://localhost:8545',
  headers: 
   { 'Postman-Token': 'd68c75a7-85d4-446b-8b15-0eade6b5e3ad',
     'cache-control': 'no-cache',
     'Content-Type': 'application/json' },
  body: 
   { id: '1',
     jsonrpc: '2.0',
     method: 'personal_newAccount',
     params: [ req.body._password ] },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  res.json({"blockchainAddress" : body.result});
  
});
});


dataManagerApiRoutes.post('/get/transactionDetails', function(req, res) {


    var options = { method: 'POST',
  url: 'http://localhost:8545',
  headers: 
   { 'cache-control': 'no-cache',
     'Content-Type': 'application/json' },
  body: 
   { jsonrpc: '2.0',
     method: 'eth_getTransactionReceipt',
     params: [ req.body._txhash ],
     id: 1 },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  res.json(body);
});
});


//--------------------------------------------

module.exports = dataManagerApiRoutes;