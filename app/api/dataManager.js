var dataManagerApiRoutes = require('express').Router();

var Web3 = require('web3');
var config = require('../config/config')

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
				"name": "_brandSerialId",
				"type": "string"
			}
		],
		"name": "destroyBrand",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_brandSerialId",
				"type": "string"
			}
		],
		"name": "getBrandDetails",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "bool"
			},
			{
				"name": "",
				"type": "bool"
			},
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
				"name": "_brandImageHash",
				"type": "string"
			}
		],
		"name": "getBrandImageDetails",
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
				"name": "_businessId",
				"type": "uint256"
			}
		],
		"name": "getBusinessDetails",
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
				"name": "_brandSerialId",
				"type": "string"
			},
			{
				"name": "_businessId",
				"type": "uint256"
			},
			{
				"name": "_additionalParametersJson",
				"type": "string"
			},
			{
				"name": "_isUsed",
				"type": "bool"
			},
			{
				"name": "_isLive",
				"type": "bool"
			}
		],
		"name": "registerBrand",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_brandImageHash",
				"type": "string"
			},
			{
				"name": "_brandSerialId",
				"type": "string"
			},
			{
				"name": "_imageTitle",
				"type": "string"
			},
			{
				"name": "_imageDescription",
				"type": "string"
			}
		],
		"name": "registerBrandImage",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_businessId",
				"type": "uint256"
			},
			{
				"name": "_businessName",
				"type": "string"
			},
			{
				"name": "_businessAddress",
				"type": "string"
			},
			{
				"name": "_businessCity",
				"type": "string"
			},
			{
				"name": "_businessState",
				"type": "string"
			},
			{
				"name": "_businessCountryCode",
				"type": "string"
			},
			{
				"name": "_businessZipCode",
				"type": "string"
			}
		],
		"name": "registerBusiness",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_brandSerialId",
				"type": "string"
			},
			{
				"name": "_businessId",
				"type": "uint256"
			},
			{
				"name": "_additionalParametersJson",
				"type": "string"
			},
			{
				"name": "_isUsed",
				"type": "bool"
			},
			{
				"name": "_isLive",
				"type": "bool"
			}
		],
		"name": "updateBrand",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_brandImageHash",
				"type": "string"
			},
			{
				"name": "_brandSerialId",
				"type": "string"
			},
			{
				"name": "_imageTitle",
				"type": "string"
			},
			{
				"name": "_imageDescription",
				"type": "string"
			}
		],
		"name": "updateBrandImage",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_businessId",
				"type": "uint256"
			},
			{
				"name": "_businessName",
				"type": "string"
			},
			{
				"name": "_businessAddress",
				"type": "string"
			},
			{
				"name": "_businessCity",
				"type": "string"
			},
			{
				"name": "_businessState",
				"type": "string"
			},
			{
				"name": "_businessCountryCode",
				"type": "string"
			},
			{
				"name": "_businessZipCode",
				"type": "string"
			}
		],
		"name": "updateBusiness",
		"outputs": [],
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
				"name": "_businessId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_businessName",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_businessAddress",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_businessCity",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_businessState",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_businessCountryCode",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_businessZipCode",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_timestamp",
				"type": "uint256"
			}
		],
		"name": "BusinessEvent",
		"type": "event"
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
				"name": "_businessId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_brandSerialId",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_additionalParametersJson",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_isUsed",
				"type": "bool"
			},
			{
				"indexed": false,
				"name": "_isLive",
				"type": "bool"
			},
			{
				"indexed": false,
				"name": "_expiredOn",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_timestamp",
				"type": "uint256"
			}
		],
		"name": "BrandEvent",
		"type": "event"
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
				"name": "_brandSerialId",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_brandImageHash",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_imageTitle",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_imageDescription",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_timestamp",
				"type": "uint256"
			}
		],
		"name": "BrandImageEvent",
		"type": "event"
	}
];

//now contract initiation
var dataManagerContract = web3.eth.contract(dataManagerContractABI).at(dataManagerContractAddress);

dataManagerApiRoutes.get('/', function(req, res) {

    res.send("Data Manager API server");

});

dataManagerApiRoutes.post('/registerBusiness', function(req, res) {

    var businessId = req.body._businessId;
    var businessName = req.body._businessName;
    var businessAddress = req.body._businessAddress;
    var businessCity = req.body._businessCity;
    var businessState = req.body._businessState;
    var businessCountryCode = req.body._businessCountryCode;
    var businessZipCode = req.body._businessZipCode;


    dataManagerContract.registerBusiness.sendTransaction(businessId, businessName, businessAddress, businessCity, businessState, businessCountryCode, businessZipCode, {
        from: web3.eth.defaultAccount,
        gas: 400000
    }, function(err, result) {
        console.log(result);
        if (!err) {

            //console.log(response);
            res.json(result);
        } else
            res.status(401).json("Error" + err);
    });
});


dataManagerApiRoutes.post('/updateBusiness', function(req, res) {

    var businessId = req.body._businessId;
    var businessName = req.body._businessName;
    var businessAddress = req.body._businessAddress;
    var businessCity = req.body._businessCity;
    var businessState = req.body._businessState;
    var businessCountryCode = req.body._businessCountryCode;
    var businessZipCode = req.body._businessZipCode;


    dataManagerContract.updateBusiness.sendTransaction(businessId, businessName, businessAddress, businessCity, businessState, businessCountryCode, businessZipCode, {
        from: web3.eth.defaultAccount,
        gas: 400000
    }, function(err, result) {
        console.log(result);
        if (!err) {

            //console.log(response);
            res.json(result);
        } else
            res.status(401).json("Error" + err);
    });
});


dataManagerApiRoutes.post('/registerBrand', function(req, res) {

    var brandSerialId = req.body._brandSerialId;
    var businessId = req.body._businessId;
    var additionalParametersJson = req.body._additionalParametersJson;
    var isUsed = req.body._isUsed;
    var isLive = req.body._isLive;
console.log(isUsed);
console.log(isLive);

    dataManagerContract.registerBrand.sendTransaction(brandSerialId, businessId, additionalParametersJson, isUsed, isLive, {
        from: web3.eth.defaultAccount,
        gas: 700000
    }, function(err, result) {
        console.log(result);
        if (!err) {

            //console.log(response);
            res.json(result);
        } else
            res.status(401).json("Error" + err);
    });
});


dataManagerApiRoutes.post('/updateBrand', function(req, res) {

    var brandSerialId = req.body._brandSerialId;
    var businessId = req.body._businessId;
    var additionalParametersJson = req.body._additionalParametersJson;
    var isUsed = req.body._isUsed;
    var isLive = req.body._isLive;


    dataManagerContract.updateBrand.sendTransaction(brandSerialId, businessId, additionalParametersJson, isUsed, isLive, {
        from: web3.eth.defaultAccount,
        gas: 700000
    }, function(err, result) {
        console.log(result);
        if (!err) {

            //console.log(response);
            res.json(result);
        } else
            res.status(401).json("Error" + err);
    });
});

dataManagerApiRoutes.post('/destroyBrand', function(req, res) {

    var brandSerialId = req.body._brandSerialId;

    dataManagerContract.destroyBrand.sendTransaction(brandSerialId, {
        from: web3.eth.defaultAccount,
        gas: 400000
    }, function(err, result) {
        console.log(result);
        if (!err) {

            //console.log(response);
            res.json(result);
        } else
            res.status(401).json("Error" + err);
    });
});

dataManagerApiRoutes.post('/registerBrandImage', function(req, res) {

    var brandImageHash = req.body._brandImageHash;
    var brandSerialId = req.body._brandSerialId;
    var imageTitle = req.body._imageTitle;
    var imageDescription = req.body._imageDescription;


    dataManagerContract.registerBrandImage.sendTransaction(brandImageHash, brandSerialId, imageTitle, imageDescription, {
        from: web3.eth.defaultAccount,
        gas: 400000
    }, function(err, result) {
        console.log(result);
        if (!err) {

            //console.log(response);
            res.json(result);
        } else
            res.status(401).json("Error" + err);
    });
});

dataManagerApiRoutes.post('/updateBrandImage', function(req, res) {

    var brandImageHash = req.body._brandImageHash;
    var brandSerialId = req.body._brandSerialId;
    var imageTitle = req.body._imageTitle;
    var imageDescription = req.body._imageDescription;


    dataManagerContract.updateBrandImage.sendTransaction(brandImageHash, brandSerialId, imageTitle, imageDescription, {
        from: web3.eth.defaultAccount,
        gas: 400000
    }, function(err, result) {
        console.log(result);
        if (!err) {

            //console.log(response);
            res.json(result);
        } else
            res.status(401).json("Error" + err);
    });
});

dataManagerApiRoutes.post('/getBusinessDetails', function(req, res) {

    var businessId = req.body._businessId;

    dataManagerContract.getBusinessDetails.call(businessId, function(err, result) {
        console.log(result);
        if (!err) {

            //console.log(response);
            res.json({
                "businessName" : result[0],
                "businessAddress" : result[1],
                "businessCity" : result[2],
                "businessState" : result[3],
                "businessCountryCode" : result[4],
				"businessZipCode" : result[5]
            });
        } else
            res.status(401).json("Error" + err);
    });

})

dataManagerApiRoutes.post('/getBrandDetails', function(req, res) {

    var brandSerialId = req.body._brandSerialId;

    dataManagerContract.getBrandDetails.call(brandSerialId, function(err, result) {
        console.log(result);
        if (!err) {

            //console.log(response);
            res.json({
                "businessId" : result[0],
                "additionalParametersJson" : result[1],
                "isUsed" : result[2],
                "isLive" : result[3],
                "expiredOn" : result[4]
            });
        } else
            res.status(401).json("Error" + err);
    });

})

dataManagerApiRoutes.post('/getBrandImageDetails', function(req, res) {

    var brandImageHash = req.body._brandImageHash;

    dataManagerContract.getBrandImageDetails.call(brandImageHash, function(err, result) {
        console.log(result);
        if (!err) {

            //console.log(response);
            res.json({
                "brandSerialId" : result[0],
                "imageTitle" : result[1],
                "imageDescription" : result[2]
            });
        } else
            res.status(401).json("Error" + err);
    });

})

dataManagerApiRoutes.get('/getBusinessLogs', function(req, res) {

    var registerBusinessEvent = dataManagerContract.BusinessEvent({
        from: web3.eth.defaultAccount
    }, {
        fromBlock: 0,
        toBlock: 'latest'
    });

    registerBusinessEvent.get(function(err, result) {
        //console.log(result);
        if (!err) {

            //console.log(response);
            res.json(result);
        } else
            return res.json("Error" + err);
    });

})

dataManagerApiRoutes.get('/getBrandLogs', function(req, res) {

    var registerBrandEvent = dataManagerContract.BrandEvent({
        from: web3.eth.defaultAccount
    }, {
        fromBlock: 0,
        toBlock: 'latest'
    });

    registerBrandEvent.get(function(err, result) {
        //console.log(result);
        if (!err) {

            //console.log(response);
            res.json(result);
        } else
            return res.json("Error" + err);
    });

})

dataManagerApiRoutes.get('/getBrandImageLogs', function(req, res) {

    var registerBrandImageEvent = dataManagerContract.BrandImageEvent({
        from: web3.eth.defaultAccount
    }, {
        fromBlock: 0,
        toBlock: 'latest'
    });

    registerBrandImageEvent.get(function(err, result) {
        //console.log(result);
        if (!err) {

            //console.log(response);
            res.json(result);
        } else
            return res.json("Error" + err);
    });

})

module.exports = dataManagerApiRoutes;
