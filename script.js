fetch("wallets.json")
.then(function(response){
	return response.json();
})
.then(function(wallets){
	let placeholder = document.querySelector("#data-output");
	let out = "";
	for(let wallet of wallets){
		out += `
			<tr>
				<td><img src='${wallet.logo}'></td>
				<td>${wallet.urlWebsite == "-" ? wallet.name: '<a href="'+wallet.urlWebsite+'">'+wallet.name+'</a>'}</td>	
				<td>${wallet.company}</td>
				<td>${wallet.holderCapability}</td>
				<td>${wallet.issuerCapability}</td>
				<td>${wallet.verifierCapability}</td>
				<td class="td-wrap">${wallet.scope}</td>
				<td>${wallet.deployment}</td>
				<td>${wallet.organizationalWallet}</td>
				<td class="td-wrap">${wallet.openSource == 'Yes' ? '<a href="'+wallet.download.source+'">'+wallet.openSource+'</a>' : wallet.openSource}</td>
				<td>${wallet.urlGooglePlayStore == '-' ? '-': '<a href="'+wallet.urlGooglePlayStore+'"><i class="fa-brands fa-google-play"></i></a>'}
				${wallet.urlAppStore == '-' ? '-': '<a href="'+wallet.urlAppStore+'"><i class="fa-brands fa-app-store"></i></a>'}
				${wallet.urlWebApp == '-' ? '-': '<a href="'+wallet.urlWebApp+'"><i class="fa-brands fa-firefox"></i></a>'}</td>
				<td>${wallet.support == '-' ? '-' : '<a href="mailto:'+wallet.support+'">e-mail</a>'}</td>
				<td>${wallet.api}</td>

				<td>${wallet.credentialFormat}</td>
				<td>${wallet.encodingScheme}</td>
				<td>${wallet.signatureAlgorithm}</td>
				<td>${wallet.identifierHolder}</td>
				<td>${wallet.identifierIssuer}</td>
				<td class="td-wrap">${wallet.revocationAlgorithm}</td>
				<td class="td-wrap">${wallet.peer2peerProtocols}</td>
				<td class="td-wrap">${wallet.credExchangeProtocol}</td>
				<td>${wallet.blockchainUsed}</td>
				<td class="td-wrap">${wallet.blockchainType}</td>
				<td class="td-wrap">${wallet.blockchainPurpose}</td>
				
				<td class="td-wrap">${wallet.connectionTypes}</td>
				<td>${wallet.deepLinking}</td>
				<td>${wallet.offlineFriendly}</td>
				<td>${wallet.keyHistoryHolder}</td>
				<td>${wallet.keyHistoryIssuer}</td>
				<td>${wallet.portability}</td>

				<td>${wallet.selectiveDisclosure}</td>
				<td>${wallet.predicates}</td>
				<td>${wallet.verifierUnlinkability}</td>
				<td>${wallet.observability}</td>

				<td>${wallet.cryptoAgility}</td>
				<td>${wallet.quantumSafe}</td>
				<td>${wallet.keyRotationHolder}</td>
				<td>${wallet.keyRotationIssuer}</td>

				<td>${wallet.eassi}</td>
				<td>${wallet.EBSI}</td>
				<td>${wallet.AIP}</td>
				<td>${wallet.DDIP}</td>
				<td>${wallet.MDOC}</td>
				
			</tr>
		`;
	}

	placeholder.innerHTML = out;
});