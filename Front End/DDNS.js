$(document).ready(function () {
	const documentRegistryContractAddress = "0x6c5ba5720c7ba3b036b643c822f40da5491eb52b";
	const documentRegistryContractABI = "";
	
	const IPFS = window.IpfsApi( 'localhost', '5001');
	const Buffer = ipfs.Buffer;
	
	$('#linkHome').click(function () {
		showView("viewHome");
	});
	
	$('#linkGetDomainInfo').click(function () {
		$('#textareaDomainName').val('');
		showView("viewGetDomainInfo");	
	});

	$('#linkRegisterDomain').click(function () {
		$('#textareaDomainName').val('');
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
		//ToDo
	}
	
	function RegisterDomain() {
		//ToDo
	}
	
	function EditDomainIP() {
		//ToDo
	}
	
	function TransferDomain() {
		//ToDo
	}
	
	function UploadDomainDocument() {
		//ToDo
	}
	
	function ContractOwnerWithdraw() {
		//ToDo
	}
	
});

