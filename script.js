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
				<td>${wallet.website == "-" ? wallet.name: '<a href="'+wallet.website+'">'+wallet.name+'</a>'}</td>	
				<td>${wallet.company}</td>
				<td class="td-wrap">${wallet.scope}</td>
				<td>${wallet.deployment}</td>
				<td>${wallet.organizationalWallet}</td>
				<td class="td-wrap">${wallet.openSource == 'Yes' ? '<a href="'+wallet.download.source+'">'+wallet.openSource+'</a>' : wallet.openSource}</td>
				<td>${wallet.download.googlePlay == '-' ? '-': '<a href="'+wallet.download.googlePlay+'"><i class="fa-brands fa-google-play"></i></a>'}
				${wallet.download.appStore == '-' ? '-': '<a href="'+wallet.download.appStore+'"><i class="fa-brands fa-app-store"></i></a>'}
				${wallet.download.webWallet == '-' ? '-': '<a href="'+wallet.download.webWallet+'"><i class="fa-brands fa-firefox"></i></a>'}</td> 
				<td>${wallet.support == '-' ? '-' : '<a href="mailto:'+wallet.support+'">e-mail</a>'}</td>

				<td>${wallet.credentialFormat}</td>
				<td>${wallet.encodingScheme}</td>
				<td>${wallet.signatureAlgorithm}</td>
				<td>${wallet.identifierHolder}</td>
				<td>${wallet.identifierIssuer}</td>
				<td class="td-wrap">${wallet.revocationAlgorithm}</td>
				<td class="td-wrap">${wallet.peer2peerProtocols}</td>
				<td class="td-wrap">${wallet.credExchangeProtocol}</td>
				<td>${wallet.blockchain.used}</td>
				<td class="td-wrap">${wallet.blockchain.type}</td>
				<td class="td-wrap">${wallet.blockchain.purpose}</td>
				
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
				<td>${wallet.postQuantumSecure}</td>
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