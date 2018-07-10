$(document).ready(function () {
	const ddnsContractAddress = "0x6c5ba5720c7ba3b036b643c822f40da5491eb52b";
	const ddnsContractABI = [
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "DomainList",
		"outputs": [
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "IP",
				"type": "string"
			},
			{
				"name": "owner",
				"type": "address"
			},
			{
				"name": "lockTime",
				"type": "uint256"
			},
			{
				"name": "infoDocumentHash",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "TransferDomain",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "IP",
				"type": "string"
			}
		],
		"name": "EditDomain",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "hash",
				"type": "string"
			}
		],
		"name": "AddDomainInfoDocument",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "IP",
				"type": "string"
			}
		],
		"name": "RegisterDomain",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "ContractOwnerWithdraw",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "name",
				"type": "string"
			}
		],
		"name": "GetDomainInfo",
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
				"type": "address"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "contractOwner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "GetContractBalance",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "timeDuration",
				"type": "uint256"
			}
		],
		"name": "NewDomainRegisteredLog",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "timeDuration",
				"type": "uint256"
			}
		],
		"name": "DomainTransferLog",
		"type": "event"
	}
];
	
	const IPFS = window.IpfsApi( 'localhost', '5001');
	const Buffer = IPFS.Buffer;
	
	$('#linkHome').click(function () {
		showView("viewHome");
	});
	
	$('#linkGetDomainInfo').click(function () {
		$('#textareaDomainName').val('');
		showView("viewGetDomainInfo");	
	});

	$('#linkRegisterDomain').click(function () {
		$('#textareaDomainName').val('');
		$('#textareaDomainIP').val('');
		showView("viewRegisterDomain");
    });
	
	$('#linkEditDomainIP').click(function () {
		$('#textareaDomainName').val('');
		$('#textareaNewIP').val('');
		showView("viewEditDomainIP");    
	});
	
	$('#linkTransferDomain').click(function () {
		$('#textareaDomainName').val('');
		$('#textareaNewOwner').val('');
		showView("viewTransferDomain");    
	});

	$('#linkUploadDomainDocument').click(function () {
		$('#textareaDomainName').val('');
		$('#documentForUpload').val('');
		showView("viewUploadDomainDocument");
	});
	
	$('#linkContractBalance').click(function () {
		$('#textareaAmount').val('');
		showView("viewContractBalance");
	});
	
	$('#buttonQueryDomainName').click(GetDomainInfo);
	$('#buttonRegisterDomain').click(RegisterDomain);
	$('#buttonEditDomain').click(EditDomainIP);
	$('#buttonTransferDomain').click(TransferDomain);
	$('#documentUploadButton').click(UploadDomainDocument);
	$('#buttonWithdraw').click(ContractOwnerWithdraw);

	// Attach AJAX "loading" event listener
	$(document).on({
    ajaxStart: function () {
        $("#loadingBox").show()
    },
    ajaxStop: function () {
        $("#loadingBox").hide()
    }
	});

	function showView(viewName) {
    // Hide all views and show the selected view only
    $('main > section').hide();
    $('#' + viewName).show();
	}

	function showInfo(message) {
    $('#infoBox>p').html(message);
    $('#infoBox').show();
    $('#infoBox>header').click(function () {
        $('#infoBox').hide();
    });
	}

	function showError(errorMsg) {
    $('#errorBox>p').html("Error: " + errorMsg);
    $('#errorBox').show();
    $('#errorBox>header').click(function () {
        $('#errorBox').hide();
    });
	}

	function GetDomainInfo() {
		if(typeof web3 === 'undefined')
			return showError("Please install MetaMask to access the Ethereum Web3 API from your web browser.");
	
		let contract = web3.eth.contract(ddnsContractABI).at(ddnsContractAddress);
		contract.GetDomainInfo($('#textareaDomainName').val(), function (err, result) {
			if (err)
				return showError("Smart contract call failed: " + err);
			
			let domainName = result[0];
			let domainIP = result[1];
			let domainOwner = result[2];
			let domainLockTime = result[3];
			let ipfsHash = result[4];
			let div = $('<div>');
			let url = "https://ipfs.io/ipfs/" + ipfsHash;
			
			let displayDate = new Date(domainLockTime * 1000).toLocaleString();
			
			$('#textareaDomainNameResult').val(domainName);
			$('#textareaDomainIPResult').val(domainIP);
			$('#textareaDomainOwnerResult').val(domainOwner);
			$('#textareaDomainValidityTime').val(displayDate);
			$('#textareaDomainInfoDocumentHash').val(ipfsHash);
						
			div
				.append($(`<img src="${url}" />`));
			html.append(div);
		});
	}
	
	function RegisterDomain() {
		if(typeof web3 === 'undefined')
			return showError("Please install MetaMask to access the Ethereum Web3 API from your web browser.");
	
		let contract = web3.eth.contract(ddnsContractABI).at(ddnsContractAddress);
		contract.GetDomainInfo($('#textareaDomainName').val(), $('#textareaDomainIP').val(), function (err, txHash) {
			if (err)
				return showError("Smart contract call failed: " + err);
			else			
				showInfo(`Domain <b>successfully registered</b>. Transaction hash: ${txHash}`);
		});
	}
	
	function EditDomainIP() {
		if(typeof web3 === 'undefined')
			return showError("Please install MetaMask to access the Ethereum Web3 API from your web browser.");
	
		let contract = web3.eth.contract(ddnsContractABI).at(ddnsContractAddress);
		contract.EditDomain('#textareaDomainName', '#textareaDomainIP', function (err, txHash) {
			if (err)
				return showError("Smart contract call failed: " + err);
			else			
				showInfo(`Domain IP <b>successfully updated</b>. Transaction hash: ${txHash}`);
		});
	}
	
	function TransferDomain() {
		if(typeof web3 === 'undefined')
			return showError("Please install MetaMask to access the Ethereum Web3 API from your web browser.");
	
		let contract = web3.eth.contract(ddnsContractABI).at(ddnsContractAddress);
		contract.EditDomain('#textareaDomainName', '#textareaNewOwner', function (err, txHash) {
			if (err)
				return showError("Smart contract call failed: " + err);
			else			
				showInfo(`Domain owner <b>successfully updated</b>. Transaction hash: ${txHash}`);
		});
	}
	
	function UploadDomainDocument() {
		if($('#documentForUpload')[0].files.length === 0) {
			return showError("Please select a file to upload.");
		}
		let fileReader = new FileReader();
		fileReader.onload = function() {
			if(typeof web3 === 'undefined')
				return showError("Please install MetaMask to access the Ethereum Web3 API from your web browser.");
			let fileBuffer = Buffer.from(fileReader.result);
			
			let contract = web3.eth.contract(ddnsContractABI).at(ddnsContractAddress);
			IPFS.files.add(fileBuffer, (err, result) => {
				if (err)
					return showError (err);
				if (result) {
					let ipfsHash = result[0].hash;
					contract.AddDomainInfoDocument('#textareaDomainName', ipfsHash, function (err, txHash) {
						if (err)
							return showError("Smart contract call failed: " + err);
						showInfo(`Document ${ipfsHash} <b>successfully uploaded</b> to the domain. Transaction hash: ${txHash}`);
					})
				}
			})
		};
		fileReader.readAsArrayBuffer($('#documentForUpload')[0].files[0]);	
	}
	
	function ContractOwnerWithdraw() {
		if(typeof web3 === 'undefined')
			return showError("Please install MetaMask to access the Ethereum Web3 API from your web browser.");
	
		let contract = web3.eth.contract(ddnsContractABI).at(ddnsContractAddress);
		contract.ContractOwnerWithdraw('#textareaAmount', function (err, txHash) {
			if (err)
				return showError("Smart contract call failed: " + err);
			else			
				showInfo(`Amount <b>successfully transferred</b>. Transaction hash: ${txHash}`);
		});
	}
	
});

