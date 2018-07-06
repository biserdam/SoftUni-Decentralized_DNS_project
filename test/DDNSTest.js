const DDNS = artifacts.require("DDNS");

const { increaseTime } = require("./utils");
const YEAR = 3600 * 24 * 365;
const ETH = 1000000000000000000;

contract("DDNS", accounts => {
	const [firstAccount, secondAccount] = accounts;
	
	let ddns;
	
	beforeEach(async() => {
		ddns = await DDNS.new();
	});
		
	it("Test setting a contract owner", async () => {
		assert.equal(await ddns.contractOwner.call(), firstAccount);
	});
		
	it("Test registering a domain with amount <1 ETH", async () => {
	try{
		await ddns.RegisterDomain('pesho.com', '1.2.3.4', { from: firstAccount, value: 0.9 * ETH });
	} catch (err){
		return;
	}
		assert(false,'value smaller than 1 ETH and test should fail but passed');
	});
		
	it("Test registering already registered and still owned domain", async () => {
		await ddns.RegisterDomain('pesho.com', '1.2.3.4', { from: firstAccount, value: 1 * ETH });
		try{
			await ddns.RegisterDomain('pesho.com', '1.2.3.4', { from: secondAccount, value: 1 * ETH });
		} catch (err){
			return;
		}
		assert(false,'domain already registered and test should fail but passed');
	});
	
	it("Test registering already registered once but expired domain(TimeTravel)", async () => {
    	await ddns.RegisterDomain('pesho.com', '1.2.3.4',{ from: firstAccount, value: 1 * ETH });
		await increaseTime(YEAR);
		try{
			await ddns.RegisterDomain('pesho.com', '1.2.3.4', { from: secondAccount, value: 1 * ETH });
		} catch (err){
			assert(false,'domain lock time already passed and registeration should be successful but failed');
		}
			return;
	});
	
	it("Test registering and extending a domain for another year", async () => {
    	await ddns.RegisterDomain('pesho.com', '1.2.3.4',{ from: firstAccount, value: 1 * ETH });
		await ddns.RegisterDomain('pesho.com', '1.2.3.4',{ from: firstAccount, value: 1 * ETH });
		await increaseTime(YEAR);
		try{
			await ddns.RegisterDomain('pesho.com', '1.2.3.4', { from: secondAccount, value: 1 * ETH });
			assert(false, 'domain registration extended to 2 years. Test should fail.');
		} catch (err) {
			assert(true);
		}
			return;
	});
		
	it("Test returning change if regitering domain with amount >1 ETH", async () => {
		await ddns.RegisterDomain('pesho.com', '1.2.3.4', { from: firstAccount, value: 11 * ETH });
		let accBalance = web3.eth.getBalance(firstAccount);
		let eigthyEightEther = web3.toWei(new web3.BigNumber(88), "ether")
		assert(accBalance.greaterThan(eigthyEightEther));
	});
	
	it("Test editing domain from NOT an owner", async () => {
		await ddns.RegisterDomain('pesho.com', '1.2.3.4', { from: firstAccount, value: 1 * ETH });
		try {
			await ddns.EditDomain('pesho.com', '9.8.7.6', { from: secondAccount });
			assert(false, 'msg.address is different than the domain owner. Test should fail.');
			return;
		} catch (err) {
			assert(true);
		}
	});
				
	it("Test editing a domain from the domain owner", async () => {
		await ddns.RegisterDomain('pesho.com', '1.2.3.4', { from: firstAccount, value: 1 * ETH });
		try {
			await ddns.EditDomain('pesho.com', '9.8.7.6', { from: firstAccount });			
		} catch (err) {
			assert(false, 'msg.address is identical to the domain owner. Test should pass');
		}		
	});
	
	it("Test trasferring a domain from the domain owner", async () => {
		await ddns.RegisterDomain('pesho.com', '1.2.3.4',{ from: firstAccount, value: 1 * ETH });
		try {
			await ddns.TransferDomain('pesho.com', secondAccount, { from: firstAccount });			
		} catch (err) {
			assert(false, 'msg.address is identical to the domain owner. Test should pass');
		}				
	});
	
		it("Test trasferring a domain from NOT domain owner", async () => {
		await ddns.RegisterDomain('pesho.com', '1.2.3.4',{ from: firstAccount, value: 1 * ETH });
		try {
			await ddns.TransferDomain('pesho.com', secondAccount, { from: secondAccount });
			assert(false, 'msg.address is different to the domain owner. Test should fail.');
			return;			
		} catch (err) {
			assert(true);
		}				
	});
	
	it("Test withdrawing amount by the contract owner", async () => {
		await ddns.RegisterDomain('pesho.com', '1.2.3.4',{ from: firstAccount, value: 1 * ETH });
		try {
			await ddns.ContractOwnerWithdraw(0.5 * ETH, { from: firstAccount });
			assert(true);
			return;
		} catch (err) {
			assert(false, 'contract owner is correct and test should pass');
		}	
	});

	it("Test withdrawing amount bigger than actual contract amount", async () => {
		await ddns.RegisterDomain('pesho.com', '1.2.3.4',{ from: firstAccount, value: 1 * ETH });
		try {
			await ddns.ContractOwnerWithdraw(1.5 * ETH, { from: firstAccount });
			assert(false, 'required withdrawal amount bigger than the contract balance and test should fail but passed');
			return;
		} catch (err) {
			assert(true);
		}	
	});
	
	it("Test withdrawing amount NOT by the contract owner", async () => {
		await ddns.RegisterDomain('pesho.com', '1.2.3.4',{ from: firstAccount, value: 1 * ETH });
		try {
			await ddns.ContractOwnerWithdraw(0.5 * ETH, { from: secondAccount });
			assert(false, 'msg.address is different than the contract owner');
			return;
		} catch (err) {
			assert(true);
		}	
	});
	
	it("Test getting domain information", async () => {
		await ddns.RegisterDomain('pesho.com', '1.2.3.4',{ from: firstAccount, value: 1 * ETH });
		try {
			await ddns.GetDomainInfo('pesho.com', { from: secondAccount });
			assert(true);
			return;
		} catch (err) {
			assert(false, 'failed to get the domain info');
		}	
	});
	
	it("Test getting correct contract balance by contract owner", async () => {
		await ddns.RegisterDomain('pesho.com', '1.2.3.4',{ from: firstAccount, value: 1 * ETH });
		await ddns.RegisterDomain('kiro.com', '2.3.4.5',{ from: secondAccount, value: 1 * ETH });
		assert.equal(await ddns.GetContractBalance.call({ from: firstAccount }), 2 * ETH);
	});
	
		it("Test getting contract balance by NOT contract owner", async () => {
		await ddns.RegisterDomain('pesho.com', '1.2.3.4',{ from: firstAccount, value: 1 * ETH });
		await ddns.RegisterDomain('kiro.com', '2.3.4.5',{ from: secondAccount, value: 1 * ETH });
		try {
			await ddns.GetContractBalance.call(({ from: secondAccount }), 2 * ETH);
			asser(false, 'msg.address is different than the contract owner. Test should fail');
			return;
		} catch (err) {
			assert(true)
		}
	});
	
		it("Test string length limitation", async () => {
		try {
			await ddns.RegisterDomain('p.c', '1.2.3.4', { from: firstAccount });
			assert(false, 'string length is smaller than the string limit. Test should fail.');
			return;
		} catch (err) {
			assert(true);
		}	
	});
	
	

});