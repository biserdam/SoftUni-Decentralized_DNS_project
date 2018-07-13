$(document).ready(function () {
	
	//const ddnsContractAddress = "0x8bf5bb3103beec1037e6da3f2741e7f9a123df8b"; //Ganache local contract address
	const ddnsContractAddress = "0x3434baeeef7737e83f10b50fa27434c17e0b473c"; //Ropsten contract address
	
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
		
	$('#linkHome').click(function () {
		showView("viewHome");
	});
	
	$('#linkGetDomainInfo').click(function () {
		$('#textareaDomainName').val('');
		showView("viewGetDomainInfo");	
	});

	$('#linkRegisterDomain').click(function () {
		$('#textareaDomainNameRegister').val('');
		$('#textareaDomainIP').val('');
		$('#textareaETH').val('');
		showView("viewRegisterDomain");
    });
	
	$('#linkEditDomainIP').click(function () {
		$('#textareaDomainNameEdit').val('');
		$('#textareaNewIP').val('');
		showView("viewEditDomainIP");    
	});
	
	$('#linkTransferDomain').click(function () {
		$('#textareaDomainNameTransfer').val('');
		$('#textareaNewOwner').val('');
		showView("viewTransferDomain");    
	});

	$('#linkUploadDomainDocument').click(function () {
		$('#textareaDomainNameUpload').val('');
		$('#documentForUpload').val('');
		showView("viewUploadDomainDocument");
	});
	
	$('#linkContractBalance').click(function () {
		$('#textareaBalance').val('');
		$('#textareaAmount').val('');
		showView("viewContractBalance");		
	});
	
	$('#buttonQueryDomainName').click(GetDomainInfo);
	$('#buttonRegisterDomain').click(RegisterDomain);
	$('#buttonEditDomain').click(EditDomainIP);
	$('#buttonTransferDomain').click(TransferDomain);
	$('#documentUploadButton').click(UploadDomainDocument);
	$('#buttonWithdraw').click(ContractOwnerWithdraw);
	$('#buttonBalance').click(GetContractBalance);

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
			let displayDate = new Date(domainLockTime * 1000).toLocaleString();
			let url = "https://ipfs.io/ipfs/" + ipfsHash;
			
			$('#textareaDomainNameResult').val(domainName);
			$('#textareaDomainIPResult').val(domainIP);
			$('#textareaDomainOwnerResult').val(domainOwner);
			if(domainLockTime > 0)
				$('#textareaDomainValidityTime').val(displayDate);
			else
				$('#textareaDomainValidityTime').val('Domain is available for purchase');
			
			$('#textareaDomainInfoDocumentHash').val(ipfsHash);
						
			if (ipfsHash !== 'Not Available' && ipfsHash !== 'n/a'){
				$('#textareaDomainInfoDocumentHash').val(url);
				let html = jQuery('<div>');
				let div = jQuery('<div>');				
				div
					//.append(jQuery(`<img src="${url}" alt="Loading..." class="ipfsImage"/>`))
					.append(jQuery(`<img src="${url}" class="ipfsImage"/>`))
				html.append(div);
				html.append('</div>');
				jQuery('#viewGetDomainInfo').append(html);
			}
		});
	}
	
	function RegisterDomain() {
		if(typeof web3 === 'undefined')
			return showError("Please install MetaMask to access the Ethereum Web3 API from your web browser.");
	
		let contract = web3.eth.contract(ddnsContractABI).at(ddnsContractAddress);
		contract.RegisterDomain($('#textareaDomainNameRegister').val(), $('#textareaDomainIP').val(), { value: ($('#textareaETH').val()*1000000000000000000) }, function (err, txHash) {
			if (err)
				return showError("Smart contract call failed: " + err);
			else			
				showInfo(`Transaction hash: ${txHash}`);
		});
	}
	
	function EditDomainIP() {
		if(typeof web3 === 'undefined')
			return showError("Please install MetaMask to access the Ethereum Web3 API from your web browser.");
		
		let contract = web3.eth.contract(ddnsContractABI).at(ddnsContractAddress);				
			contract.EditDomain($('#textareaDomainNameEdit').val(), $('#textareaNewIP').val(), function (err, txHash) {
			if (err)
				return showError("Smart contract call failed: " + err);
			else			
				showInfo(`Transaction hash: ${txHash}`);				
		});
	}
	
	function TransferDomain() {
		if(typeof web3 === 'undefined')
			return showError("Please install MetaMask to access the Ethereum Web3 API from your web browser.");
	
		let contract = web3.eth.contract(ddnsContractABI).at(ddnsContractAddress);
		contract.TransferDomain($('#textareaDomainNameTransfer').val(), $('#textareaNewOwner').val(), function (err, txHash) {
			if (err)
				return showError("Smart contract call failed: " + err);
			else			
				showInfo(`Transaction hash: ${txHash}`);
		});
	}
		
	function UploadDomainDocument() {

		if(jQuery('#documentForUpload')[0].files.length === 0){
			return showError("Please select a file to upload.");
		}
		let fileReader = new FileReader();
		fileReader.onload = function () {
			if(typeof Web3 ==='undefined'){
				return showError("Please install MetaMask to access the Ethereum Web3 API from your Web browser.");
			}
		
			web3js = new Web3(web3.currentProvider); 
			const ipfs = window.IpfsApi('localhost', '5001');
			const Buffer = ipfs.Buffer;
			let fileBuffer = Buffer.from(fileReader.result);		
				
			let contract = web3js.eth.contract(ddnsContractABI).at(ddnsContractAddress);
			ipfs.files.add(fileBuffer, (err, result) => {
				if (err)
					return showError(err);
				if (result) {
					let ipfsHash = result[0].hash;
					contract.AddDomainInfoDocument($('#textareaDomainNameUpload').val(), ipfsHash, function (err, txHash) {
						if (err)
							return showError("Smart contract call failed: " + err);
						showInfo(`IPFS Document ${ipfsHash}. Transaction hash: ${txHash}`);
					});
				}
			});			
		};
		fileReader.readAsArrayBuffer(jQuery('#documentForUpload')[0].files[0]);
	}
	
	function GetContractBalance() {
		if(typeof web3 === 'undefined')
			return showError("Please install MetaMask to access the Ethereum Web3 API from your web browser.");
	
		let contract = web3.eth.contract(ddnsContractABI).at(ddnsContractAddress);
		contract.GetContractBalance( function (err, result) {
			if (err)
				return showError("Smart contract call failed: " + err);
			
			let balance = result;
			$('#textareaBalance').val(balance/1000000000000000000);
		});
	}
	
	function ContractOwnerWithdraw() {
		if(typeof web3 === 'undefined')
			return showError("Please install MetaMask to access the Ethereum Web3 API from your web browser.");
	
		let contract = web3.eth.contract(ddnsContractABI).at(ddnsContractAddress);
		
		contract.ContractOwnerWithdraw(($('#textareaAmount').val()*1000000000000000000), function (err, txHash) {
			if (err)
				return showError("Smart contract call failed: " + err);
						
			showInfo(`Amount <b>successfully transferred</b>. Transaction hash: ${txHash}`);
		});
	}
	
});

