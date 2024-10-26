
import { Wallet } from './types';

export const walletData: Wallet[] = [
  {
    "capability": [
      "holder"
    ],
    "company": "AceBlock",
    "name": "AceID Wallet",
    "openSource": false,
    "type": "cloud",
    "urlWebsite": "https://www.aceblock.com/modules/aceid/",
    "id": "aceid-wallet",
    "commitHistory": "https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/aceid-wallet.json"
  },
  {
    "capability": [
      "holder"
    ],
    "company": "Talao",
    "contact": "contact@altme.io",
    "urlWebsite": "https://altme.io/",
    "credentialProfiles": [
      "EBSI"
    ],
    "downloadSource": "https://github.com/TalaoDAO/AltMe",
    "license": "Apache 2.0",
    "logo": "logos/altme.png",
    "name": "Altme",
    "openSource": true,
    "type": "edge",
    "urlAppStore": "https://apps.apple.com/fr/app/altme/id1633216869",
    "urlGooglePlayStore": "https://play.google.com/store/apps/details?id=co.altme.alt.me.altme",
    "id": "altme",
    "commitHistory": "https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/altme.json"
  },
  {
    "capability": [
      "issuer",
      "holder",
      "verifier"
    ],
    "type": "cloud",
    "name": "Anonyome Enterprise Wallet",
    "logo": "logos/anonyome.png",
    "company": "Anonyome Labs",
    "companyUrl": "https://www.anonyome.com",
    "urlWebsite": "https://sudoplatform.com/verifiable-credentials/",
    "openSource": false,
    "license": "",
    "credentialProfiles": [
      "AnonCreds with did:indy"
    ],
    "credentialFormats": [
      "AnonCred",
      "LDP-VC",
      "VC (1.1)"
    ],
    "issuanceProtocols": [
      "Issue Credential v1",
      "Issue Credential v2"
    ],
    "keyManagements": [
      "did:indy",
      "did:key",
      "did:peer",
      "link secrets"
    ],
    "presentationProtocols": [
      "Present Proof v2",
      "Present Proof v1.0"
    ],
    "signingAlgorithms": [
      "BBS+ with public key binding",
      "CL",
      "ECDSA",
      "EdDSA"
    ],
    "statusManagements": [
      "Indy Revocation"
    ],
    "trustManagements": [],
    "id": "anonyome-enterprise-wallet",
    "commitHistory": "https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/anonyome-enterprise-wallet.json"
  },
  {
    "capability": [
      "holder"
    ],
    "type": "edge",
    "name": "Anonyome Mobile Wallet",
    "logo": "logos/anonyome.png",
    "company": "Anonyome Labs",
    "companyUrl": "https://www.anonyome.com",
    "urlWebsite": "https://sudoplatform.com/identity-wallet/",
    "openSource": false,
    "license": "",
    "credentialProfiles": [
      "AnonCreds with did:indy"
    ],
    "credentialFormats": [
      "AnonCred",
      "LDP-VC",
      "VC (1.1)"
    ],
    "issuanceProtocols": [
      "Issue Credential v1",
      "Issue Credential v2"
    ],
    "keyManagements": [
      "did:indy",
      "did:key",
      "did:peer",
      "link secrets"
    ],
    "presentationProtocols": [
      "Present Proof v2",
      "Present Proof v1.0"
    ],
    "signingAlgorithms": [
      "BBS+ with public key binding",
      "CL",
      "ECDSA",
      "EdDSA"
    ],
    "statusManagements": [
      "Indy Revocation"
    ],
    "trustManagements": [],
    "id": "anonyome-wallet",
    "commitHistory": "https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/anonyome-wallet.json"
  },
  {
    "capability": [
      "holder"
    ],
    "company": "Apple",
    "logo": "logos/apple-wallet.png",
    "name": "Apple Wallet",
    "openSource": false,
    "type": "edge",
    "urlWebsite": "https://www.apple.com/wallet/",
    "id": "apple-wallet",
    "commitHistory": "https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/apple-wallet.json"
  },
  {
    "capability": [
      "holder"
    ],
    "company": "IOHK",
    "credentialFormats": [
      "JWT-VC"
    ],
    "logo": "logos/atala-prism.png",
    "name": "Atala PRISM",
    "openSource": false,
    "signingAlgorithms": [
      "ECDSA"
    ],
    "urlWebsite": "https://atalaprism.io/",
    "id": "atala-prism",
    "commitHistory": "https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/atala-prism.json"
  },
  {
    "capability": [
      "holder"
    ],
    "company": "Microsoft",
    "credentialFormats": [
      "JWT-VC"
    ],
    "keyManagements": [
      "did:web"
    ],
    "logo": "logos/authenticator.png",
    "name": "Authenticator",
    "openSource": false,
    "presentationProtocols": [
      "OpenID4VP"
    ],
    "type": "edge",
    "urlAppStore": "https://go.microsoft.com/fwlink/p/?linkid=2168643&clcid=0x409",
    "urlGooglePlayStore": "https://go.microsoft.com/fwlink/p/?linkid=2168850&clcid=0x409",
    "urlWebsite": "https://www.microsoft.com/en-us/security/mobile-authenticator-app",
    "id": "authenticator",
    "commitHistory": "https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/authenticator.json"
  },
  {
    "capability": [
      "holder"
    ],
    "company": "Government of BC",
    "credentialFormats": [
      "AnonCred"
    ],
    "credentialProfiles": [
      "AnonCreds with did:indy"
    ],
    "downloadSource": "https://github.com/bcgov/bc-wallet-mobile",
    "license": "Apache 2.0",
    "logo": "logos/bc-wallet.png",
    "name": "BC Wallet",
    "openSource": true,
    "signingAlgorithms": [
      "CL"
    ],
    "type": "edge",
    "urlAppStore": "https://apps.apple.com/us/app/bc-wallet/id1587380443",
    "urlGooglePlayStore": "https://play.google.com/store/apps/details?id=ca.bc.gov.BCWallet",
    "urlWebsite": "https://www2.gov.bc.ca/gov/content/governments/government-id/bc-wallet",
    "dependencies": [
      "bifold",
      "credo",
      "sd-jwt-js"
    ],
    "id": "bc-wallet",
    "commitHistory": "https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/bc-wallet.json"
  },
  {
    "capability": [
      "holder"
    ],
    "company": "Hyland Credentials",
    "downloadSource": "https://github.com/blockchain-certificates/blockcerts-verifier",
    "logo": "logos/blockcerts-unversal-verifier.png",
    "name": "Blockcerts Universal Verifier",
    "openSource": true,
    "type": "cloud",
    "urlWebApp": "https://www.blockcerts.org/",
    "urlWebsite": "https://www.blockcerts.org/about.html",
    "id": "blockcerts-unversal-verifier",
    "commitHistory": "https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/blockcerts-unversal-verifier.json"
  },
  {
    "capability": [
      "holder"
    ],
    "company": "Hyland Credentials (formerly: Learning Machine)",
    "downloadSource": "https://github.com/blockchain-certificates",
    "logo": "logos/blockcerts-wallet.png",
    "name": "Blockcerts Wallet",
    "openSource": true,
    "type": "edge",
    "urlAppStore": "https://itunes.apple.com/us/app/blockcerts-wallet/id1146921514?mt=8",
    "urlGooglePlayStore": "https://play.google.com/store/apps/details?id=com.learningmachine.android.app&hl=en",
    "urlWebsite": "https://www.blockcerts.org/about.html",
    "id": "blockcerts-wallet",
    "commitHistory": "https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/blockcerts-wallet.json"
  },
  {
    "capability": [
      "holder"
    ],
    "company": "Systems Integration Solutions",
    "credentialProfiles": [
      "EBSI"
    ],
    "logo": "logos/corposign-did.svg",
    "name": "CorpoSign DID",
    "urlGooglePlayStore": "https://play.google.com/store/apps/details?id=app.sis.mydid.net",
    "urlWebsite": "https://sis.lt/",
    "id": "corposign-did",
    "commitHistory": "https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/corposign-did.json"
  },
  {
    "capability": [
      "holder"
    ],
    "company": "Datakeeper Wallet",
    "credentialFormats": [
      "LDP-VC"
    ],
    "logo": "logos/datakeeper.png",
    "name": "Datakeeper",
    "openSource": false,
    "signingAlgorithms": [
      "ECDSA"
    ],
    "urlAppStore": "https://apps.apple.com/nl/app/datakeeper/id1546059184",
    "urlGooglePlayStore": "https://play.google.com/store/apps/details?id=nl.rabobank.ida&gl=US",
    "urlWebsite": "https://www.datakeeper.nl/en",
    "id": "datakeeper",
    "commitHistory": "https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/datakeeper.json"
  },
  {
    "capability": [
      "holder"
    ],
    "company": "ArcBlock",
    "name": "DID Wallet",
    "urlAppStore": "https://itunes.apple.com/app/id1460083542",
    "urlGooglePlayStore": "https://play.google.com/store/apps/details?id=com.arcblock.wallet.app.product",
    "urlWebApp": "https://www.didwallet.io/",
    "urlWebsite": "https://www.arcblock.io/content/collections/en/did-wallet",
    "id": "did-wallet",
    "commitHistory": "https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/did-wallet.json"
  },
  {
    "capability": [
      "holder"
    ],
    "company": "Thales",
    "name": "Digital ID Wallet",
    "openSource": false,
    "urlWebsite": "https://www.thalesgroup.com/en/markets/digital-identity-and-security/government/identity/digital-identity-services/digital-id-wallet",
    "id": "digital-id-wallet",
    "commitHistory": "https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/digital-id-wallet.json"
  },
  {
    "capability": [
      "issuer",
      "verifier"
    ],
    "company": "Dock",
    "contact": "marketing@dock.io",
    "downloadSource": "https://github.com/orgs/docknetwork/",
    "name": "Dock Certs",
    "urlWebsite": "https://www.dock.io/feature/issue-verifiable-credentials",
    "id": "dock-certs",
    "commitHistory": "https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/dock-certs.json"
  },
  {
    "capability": [
      "holder"
    ],
    "company": "Dock",
    "contact": "marketing@dock.io",
    "downloadSource": "https://github.com/docknetwork/universal-wallet",
    "name": "Dock Wallet",
    "type": "edge",
    "urlAppStore": "https://apps.apple.com/ph/app/dock-wallet/id1565227368",
    "urlGooglePlayStore": "https://play.google.com/store/apps/details?id=com.dockapp",
    "urlWebsite": "https://www.dock.io/dock-wallet-app",
    "id": "dock-wallet",
    "commitHistory": "https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/dock-wallet.json"
  },
  {
    "name": "DID Controller",
    "logo": "logos/eecc-did-controller.png",
    "company": "European EPC Competence Center GmbH",
    "companyUrl": "https://id.eecc.de/products/did_controller.html",
    "type": "cloud",
    "openSource": false,
    "capability": [
      "issuer",
      "holder"
    ],
    "portability": false,
    "urlWebsite": "https://id.eecc.de/products/did_controller.html",
    "credentialProfiles": [],
    "credentialFormats": [
      "LDP-VC"
    ],
    "issuanceProtocols": [
      "OpenID4VCI"
    ],
    "keyManagements": [
      "did:key",
      "did:web"
    ],
    "presentationProtocols": [
      "OpenID4VP"
    ],
    "signingAlgorithms": [
      "ECDSA",
      "EdDSA"
    ],
    "statusManagements": [
      "Status List 2021"
    ],
    "trustManagements": [
      "Verifier knows Issuers"
    ],
    "id": "eecc-did-controller",
    "commitHistory": "https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/eecc-did-controller.json"
  },
  {
    "name": "VC Verifier",
    "logo": "logos/eecc-verifier.png",
    "company": "European EPC Competence Center GmbH",
    "companyUrl": "https://id.eecc.de/products/vc_verifier.html",
    "type": "cloud",
    "openSource": true,
    "downloadSource": "https://github.com/european-epc-competence-center/vc-verifier",
    "license": "AGPL-3.0",
    "capability": [
      "verifier"
    ],
    "portability": true,
    "urlWebsite": "https://ssi.eecc.de/verifier/",
    "credentialProfiles": [],
    "credentialFormats": [
      "LDP-VC",
      "SD-JWT-VC",
      "SD-JWT"
    ],
    "issuanceProtocols": [],
    "keyManagements": [
      "did:jwk",
      "did:key",
      "did:web"
    ],
    "presentationProtocols": [
      "OpenID4VP"
    ],
    "signingAlgorithms": [
      "ECDSA",
      "EdDSA"
    ],
    "statusManagements": [
      "Status List 2021"
    ],
    "trustManagements": [],
    "id": "eecc-verifier",
    "commitHistory": "https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/eecc-verifier.json"
  },
  {
    "capability": [
      "holder",
      "issuer",
      "verifier"
    ],
    "company": "Community Cred",
    "companyUrl": "https://communitycred.org/",
    "contact": "info@communitycred.org",
    "name": "Endorser Mobile",
    "type": "cloud",
    "urlAppStore": "https://apps.apple.com/us/app/endorser-mobile/id1556368693",
    "urlGooglePlayStore": "https://play.google.com/store/apps/details?id=ch.endorser.mobile",
    "urlWebsite": "https://endorser.ch/",
    "id": "endorser-mobile",
    "commitHistory": "https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/endorser-mobile.json"
  },
  {
    "capability": [
      "holder"
    ],
    "company": "esatus AG",
    "credentialFormats": [
      "AnonCred"
    ],
    "credentialProfiles": [
      "AnonCreds with did:indy"
    ],
    "issuanceProtocols": [
      "Issue Credential v2"
    ],
    "logo": "logos/esatus-wallet.png",
    "name": "esatus Wallet",
    "openSource": false,
    "signingAlgorithms": [
      "CL"
    ],
    "statusManagements": [
      "Indy Revocation"
    ],
    "type": "edge",
    "urlAppStore": "https://apps.apple.com/us/app/esatus-wallet/id1496769057?itsct=apps_box&itscg=30200",
    "urlGooglePlayStore": "https://play.google.com/store/apps/details?id=com.esatus.wallet&hl=de_DE&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1",
    "urlWebsite": "https://esatus.com/index.html%3Fp=7663&lang=en.html",
    "id": "esatus-wallet",
    "commitHistory": "https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/esatus-wallet.json"
  },
  {
    "capability": [
      "holder"
    ],
    "company": "ESSIF Playground",
    "downloadSource": "https://github.com/majo32/sk-essif-verifier",
    "logo": "logos/essif-wallet.svg",
    "name": "ESSIF Wallet",
    "type": "cloud",
    "urlWebApp": "https://wallet.essif.sk/",
    "urlWebsite": "https://docs.essif.sk/en/home-english/",
    "id": "essif-wallet",
    "commitHistory": "https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/essif-wallet.json"
  },
  {
    "capability": [
      "holder"
    ],
    "type": "edge",
    "name": "Farmworker Wallet OS",
    "logo": "https://cdn.prod.website-files.com/6520979d785cc136404a270d/65237d6a3505e25d76ed58c7_wallet-p-1080.png",
    "company": " Entidad",
    "companyUrl": "https://www.entidad.io",
    "urlWebsite": "https://www.farmworkerwalletos.community/",
    "downloadSource": "https://github.com/openwallet-foundation-labs/farmworker-wallet-os",
    "openSource": true,
    "license": "Apache 2.0",
    "portability": false,
    "credentialProfiles": [
      "AnonCreds with did:indy",
      "AnonCreds with did:web"
    ],
    "credentialFormats": [
      "AnonCred"
    ],
    "issuanceProtocols": [],
    "keyManagements": [
      "did:indy",
      "did:jwk",
      "did:key",
      "did:peer",
      "did:web",
      "raw public keys (jwk)"
    ],
    "presentationProtocols": [
      "Present Proof v2",
      "Present Proof v1.0"
    ],
    "signingAlgorithms": [
      "CL",
      "ECDSA",
      "EdDSA"
    ],
    "statusManagements": [],
    "trustManagements": [],
    "id": "farmworker-wallet-os",
    "commitHistory": "https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/farmworker-wallet-os.json"
  },
  {
    "capability": [
      "issuer",
      "verifier"
    ],
    "company": "Gataca Inc.",
    "credentialFormats": [
      "LDP-VC",
      "JWT-VC"
    ],
    "credentialProfiles": [
      "EBSI"
    ],
    "issuanceProtocols": [
      "OpenID4VCI"
    ],
    "keyManagements": [
      "did:key"
    ],
    "logo": "logos/gataca.png",
    "name": "Gataca Studio",
    "openSource": false,
    "presentationProtocols": [
      "OpenID4VP"
    ],
    "signingAlgorithms": [
      "EdDSA",
      "RSA"
    ],
    "statusManagements": [
      "Status List 2021"
    ],
    "type": "cloud",
    "urlWebsite": "https://gataca.io/products/gatacaStudio/",
    "id": "gataca-studio",
    "commitHistory": "https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/gataca-studio.json"
  },
  {
    "capability": [
      "holder"
    ],
    "company": "Gataca Inc.",
    "credentialFormats": [
      "LDP-VC",
      "JWT-VC"
    ],
    "credentialProfiles": [
      "EBSI"
    ],
    "issuanceProtocols": [
      "OpenID4VCI"
    ],
    "keyManagements": [
      "did:key"
    ],
    "logo": "logos/gataca.png",
    "name": "Gataca Wallet",
    "openSource": false,
    "presentationProtocols": [
      "OpenID4VP"
    ],
    "signingAlgorithms": [
      "EdDSA",
      "RSA"
    ],
    "statusManagements": [
      "Status List 2021"
    ],
    "type": "edge",
    "urlAppStore": "https://apps.apple.com/us/app/gataca/id1498607616",
    "urlGooglePlayStore": "https://play.google.com/store/apps/details?id=com.gataca.identity",
    "urlWebsite": "https://gataca.io/products/wallet/",
    "id": "gataca",
    "commitHistory": "https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/gataca.json"
  },
  {
    "capability": [
      "holder"
    ],
    "company": "Gimly",
    "logo": "logos/gimly.svg",
    "name": "Gimly ID",
    "urlWebsite": "https://gimly.io/",
    "id": "gimly",
    "commitHistory": "https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/gimly.json"
  },
  {
    "capability": [
      "holder"
    ],
    "company": "Blockchain Helix AG",
    "credentialFormats": [
      "JWT",
      "JWT-VC"
    ],
    "issuanceProtocols": [
      "OpenID4VCI",
      "Issue Credential v2"
    ],
    "keyManagements": [
      "did:key"
    ],
    "logo": "logos/helix-id.png",
    "name": "helix id",
    "openSource": false,
    "presentationProtocols": [
      "OpenID4VP"
    ],
    "signingAlgorithms": [
      "BBS+ with public key binding",
      "ECDSA"
    ],
    "type": "edge",
    "urlAppStore": "https://apps.apple.com/de/app/helix-id-wallet/id1469238013",
    "urlGooglePlayStore": "https://play.google.com/store/apps/details?id=com.io.helix.id",
    "urlWebsite": "https://helixid.io/",
    "id": "helix-id",
    "commitHistory": "https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/helix-id.json"
  },
  {
    "name": "hightrust.id",
    "logo": "logos/hightrust.png",
    "company": "Megical Oy",
    "type": "edge",
    "openSource": false,
    "license": "Commercial software license",
    "capability": [
      "holder"
    ],
    "credentialProfiles": [],
    "credentialFormats": [],
    "issuanceProtocols": [],
    "keyManagements": [],
    "presentationProtocols": [],
    "signingAlgorithms": [],
    "statusManagements": [],
    "trustManagements": [],
    "urlAppStore": "https://apps.apple.com/fi/app/hightrust-id/id1549852126",
    "urlGooglePlayStore": "https://play.google.com/store/apps/details?id=com.megical.easyaccess",
    "urlWebsite": "https://www.hightrust.id",
    "id": "hightrust.id",
    "commitHistory": "https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/hightrust.id.json"
  },
  {
    "capability": [
      "holder"
    ],
    "company": "Indicio",
    "credentialFormats": [
      "AnonCred"
    ],
    "credentialProfiles": [
      "AnonCreds with did:indy"
    ],
    "logo": "logos/holdr.png",
    "name": "Holdr+",
    "type": "edge",
    "urlAppStore": "https://apps.apple.com/us/app/holdr/id1620628623",
    "urlGooglePlayStore": "https://play.google.com/store/apps/details?id=tech.indicio.holdrplus",
    "urlWebsite": "https://indicio.tech/holdr/",
    "id": "holdr",
    "commitHistory": "https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/holdr.json"
  },
  {
    "capability": [
      "holder"
    ],
    "company": "2060",
    "contact": "a@2060.io",
    "companyUrl": "https://2060.io",
    "credentialFormats": [
      "AnonCred"
    ],
    "credentialProfiles": [
      "AnonCreds with did:indy",
      "AnonCreds with did:web"
    ],
    "openSource": false,
    "issuanceProtocols": [
      "Issue Credential v1",
      "Issue Credential v2"
    ],
    "keyManagements": [
      "did:key",
      "did:peer",
      "did:web",
      "did:indy"
    ],
    "logo": "logos/hologram.png",
    "name": "Hologram",
    "presentationProtocols": [
      "Present Proof v1.0",
      "Present Proof v2"
    ],
    "signingAlgorithms": [
      "ECDSA",
      "EdDSA",
      "CL"
    ],
    "statusManagements": [
      "Indy Revocation"
    ],
    "type": "edge",
    "urlAppStore": "https://apps.apple.com/co/app/hologram-messaging/id6474701855",
    "urlGooglePlayStore": "https://play.google.com/store/apps/details?id=io.twentysixty.mobileagent.m",
    "urlWebsite": "https://2060.io/#download",
    "id": "hologram",
    "commitHistory": "https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/hologram.json"
  },
  {
    "capability": [
      "verifier"
    ],
    "company": "Next ID",
    "logo": "logos/icef.png",
    "name": "ICEF Certificate Verifier",
    "type": "cloud",
    "urlWebApp": "https://verifier.nextid.com/",
    "urlWebsite": "https://nextid.com/",
    "id": "icef",
    "commitHistory": "https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/icef.json"
  },
  {
    "capability": [
      "issuer",
      "holder",
      "verifier"
    ],
    "company": "Identry",
    "credentialFormats": [
      "AnonCred"
    ],
    "credentialProfiles": [
      "AnonCreds with did:indy"
    ],
    "logo": "logos/identry.png",
    "name": "Identry",
    "openSource": false,
    "signingAlgorithms": [
      "CL"
    ],
    "statusManagements": [
      "Indy Revocation"
    ],
    "urlAppStore": "https://apps.apple.com/us/app/identry/id1609224919",
    "urlWebsite": "https://identry.io/",
    "id": "identry",
    "commitHistory": "https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/identry.json"
  },
  {
    "name": "iGrant.io Data Wallet",
    "logo": "logos/igrant.io-wallet.png",
    "company": "iGrant.io (Sweden)",
    "companyUrl": "https://igrant.io/",
    "type": "edge",
    "urlAppStore": "https://apple.co/2Mz9nJp",
    "urlGooglePlayStore": "https://play.google.com/store/apps/details?id=io.igrant.mobileagent",
    "urlWebApp": "https://business.igrant.io/",
    "urlWebsite": "https://igrant.io/datawallet.html",
    "openSource": false,
    "license": "Commercial",
    "capability": [
      "holder"
    ],
    "portability": true,
    "credentialProfiles": [
      "AnonCreds with did:indy",
      "EBSI",
      "HAIP",
      "ICAO DTC",
      "SD-JWT VCs (w/ X.509 for Issuers)",
      "x.509"
    ],
    "credentialFormats": [
      "AnonCred",
      "ICAO DTC",
      "JWP",
      "JWT-VC",
      "JWT",
      "SD-JWT-VC",
      "SD-JWT",
      "VC (1.1)",
      "x509"
    ],
    "issuanceProtocols": [
      "OpenID4VCI"
    ],
    "keyManagements": [
      ".well-known/jwt-issuer",
      "did:ebsi",
      "did:indy",
      "did:key",
      "jwks_uri",
      "link secrets",
      "pub key in X.509 cert",
      "raw public keys (jwk)"
    ],
    "presentationProtocols": [
      "OpenID4VP"
    ],
    "signingAlgorithms": [
      "CL",
      "ECDSA",
      "EdDSA"
    ],
    "statusManagements": [
      "Indy Revocation",
      "Status List 2021"
    ],
    "trustManagements": [
      "EBSI Trust Registries",
      "OpenID Connect Federation",
      "Verifier knows Issuers",
      "X.509 certificates"
    ],
    "id": "igrant.io-data-wallet",
    "commitHistory": "https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/igrant.io-data-wallet.json"
  },
  {
    "name": "iGrant.io Enterprise Wallet",
    "logo": "logos/igrant.io-wallet.png",
    "company": "iGrant.io (Sweden)",
    "companyUrl": "https://igrant.io/",
    "type": "cloud",
    "urlWebApp": "https://business.igrant.io/",
    "urlWebsite": "https://igrant.io",
    "openSource": false,
    "license": "Commercial",
    "capability": [
      "issuer",
      "verifier"
    ],
    "portability": true,
    "credentialProfiles": [
      "AnonCreds with did:indy",
      "EBSI",
      "HAIP",
      "ICAO DTC",
      "SD-JWT VCs (w/ X.509 for Issuers)",
      "x.509"
    ],
    "credentialFormats": [
      "AnonCred",
      "ICAO DTC",
      "JWP",
      "JWT-VC",
      "JWT",
      "SD-JWT-VC",
      "SD-JWT",
      "VC (1.1)",
      "x509"
    ],
    "issuanceProtocols": [
      "OpenID4VCI"
    ],
    "keyManagements": [
      ".well-known/jwt-issuer",
      "did:ebsi",
      "did:indy",
      "did:key",
      "jwks_uri",
      "link secrets",
      "pub key in X.509 cert",
      "raw public keys (jwk)"
    ],
    "presentationProtocols": [
      "OpenID4VP"
    ],
    "signingAlgorithms": [
      "CL",
      "ECDSA",
      "EdDSA"
    ],
    "statusManagements": [
      "Indy Revocation",
      "Status List 2021"
    ],
    "trustManagements": [
      "EBSI Trust Registries",
      "OpenID Connect Federation",
      "Verifier knows Issuers",
      "X.509 certificates"
    ],
    "id": "igrant.io-enterprise-wallet",
    "commitHistory": "https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/igrant.io-enterprise-wallet.json"
  },
  {
    "capability": [
      "holder"
    ],
    "type": "edge",
    "name": "Identfy",
    "logo": "logos/izertis-identfy-logo-blue.png",
    "company": "Izertis, S.A.",
    "companyUrl": "https://www.izertis.com/en/",
    "urlWebsite": "https://github.com/izertis/identfy-holder-wallet",
    "urlAppStore": "https://apps.apple.com/do/app/identfy/id6476503276",
    "urlGooglePlayStore": "https://play.google.com/store/apps/details?id=com.identfywallet.app",
    "downloadSource": "https://github.com/izertis/identfy-holder-wallet",
    "openSource": true,
    "license": "Dual: AGPL-3.0 and Commercial License",
    "portability": false,
    "credentialProfiles": [
      "EBSI",
      "JWT VC Presentation Profile 2",
      "JWT VC Presentation Profile"
    ],
    "credentialFormats": [
      "JWT-VC",
      "JWT",
      "VC (1.1)"
    ],
    "issuanceProtocols": [
      "OpenID4VCI"
    ],
    "keyManagements": [
      "did:key"
    ],
    "presentationProtocols": [
      "OpenID4VP"
    ],
    "signingAlgorithms": [
      "ECDSA"
    ],
    "statusManagements": [
      "Status List 2021",
      "Validity Credential",
      "medium-term expiration",
      "short-term expiration"
    ],
    "trustManagements": [
      "EBSI Trust Registries"
    ],
    "id": "izertis-identfy",
    "commitHistory": "https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/izertis-identfy.json"
  },
  {
    "capability": [
      "issuer",
      "verifier"
    ],
    "company": "KayTrust",
    "name": "KayTrust Provider",
    "openSource": false,
    "type": "cloud",
    "urlWebsite": "https://developer.kaytrust.id/Provider/",
    "id": "kaytrust-provider",
    "commitHistory": "https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/kaytrust-provider.json"
  },
  {
    "capability": [
      "holder"
    ],
    "company": "KayTrust",
    "contact": "did@emeal.nttdata.com",
    "logo": "logos/kaytrust-wallet.png",
    "name": "KayTrust Wallet",
    "openSource": false,
    "type": "edge",
    "urlAppStore": "https://apps.apple.com/us/app/mytrust-wallet/id1477073898",
    "urlGooglePlayStore": "https://play.google.com/store/apps/details?id=com.everis.mytrust.app",
    "urlWebsite": "https://kaytrust.id/",
    "id": "kaytrust-wallet",
    "commitHistory": "https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/kaytrust-wallet.json"
  },
  {
    "capability": [
      "holder",
      "verifier"
    ],
    "type": "edge",
    "name": "Learner Credential Wallet",
    "logo": "logos/learner-credential-wallet.png",
    "company": "MIT (Digital Credentials Consortium)",
    "companyUrl": "https://digitalcredentials.mit.edu/",
    "urlWebsite": "https://lcw.app/",
    "urlAppStore": "https://apps.apple.com/us/app/learner-credential-wallet/id1590615710",
    "urlGooglePlayStore": "https://play.google.com/store/apps/details?id=app.lcw&&pli=1",
    "urlWebApp": "https://lcw.app",
    "downloadSource": "https://github.com/digitalcredentials/learner-credential-wallet",
    "openSource": true,
    "license": "MIT",
    "portability": true,
    "credentialProfiles": [
      "JFFLabs x VC-EDU PlugFest2 (LDP)",
      "JFFLabs x VC-EDU PlugFest2 (VC)"
    ],
    "credentialFormats": [
      "VC (1.1)"
    ],
    "issuanceProtocols": [],
    "keyManagements": [
      "did:key",
      "did:web"
    ],
    "presentationProtocols": [],
    "signingAlgorithms": [
      "EdDSA"
    ],
    "statusManagements": [
      "Status List 2021"
    ],
    "trustManagements": [],
    "id": "learner-credential-wallet",
    "commitHistory": "https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/learner-credential-wallet.json"
  },
  {
    "capability": [
      "issuer",
      "verifier"
    ],
    "company": "Lissi GmbH",
    "contact": "info@lissi.id",
    "companyUrl": "https://www.lissi.id/",
    "credentialProfiles": [
      "HAIP",
      "ISO mDL",
      "SD-JWT VCs (w/ X.509 for Issuers)"
    ],
    "credentialFormats": [
      "MDOC",
      "SD-JWT-VC"
    ],
    "issuanceProtocols": [
      "OpenID4VCI"
    ],
    "keyManagements": [
      ".well-known/jwt-issuer",
      "pub key in X.509 cert"
    ],
    "presentationProtocols": [
      "OpenID4VP"
    ],
    "signingAlgorithms": [
      "ECDSA"
    ],
    "statusManagements": [
      "JWT/CWT status list"
    ],
    "trustManagements": [
      "Verifier knows Issuers",
      "X.509 certificates"
    ],
    "logo": "logos/lissi.png",
    "name": "Lissi EUDI-Wallet Connector",
    "openSource": false,
    "type": "cloud",
    "urlWebApp": "https://www.lissi.id/?r=0#user-flow",
    "urlWebsite": "https://www.lissi.id/eudi-wallet-connector",
    "id": "lissi-eudi-wallet-connector",
    "commitHistory": "https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/lissi-eudi-wallet-connector.json"
  },
  {
    "capability": [
      "holder"
    ],
    "company": "Lissi GmbH",
    "companyUrl": "https://www.lissi.id/",
    "contact": "info@lissi.id",
    "portability": false,
    "credentialProfiles": [
      "HAIP",
      "ISO mDL",
      "SD-JWT VCs (w/ X.509 for Issuers)"
    ],
    "credentialFormats": [
      "MDOC",
      "SD-JWT-VC"
    ],
    "issuanceProtocols": [
      "OpenID4VCI"
    ],
    "keyManagements": [
      ".well-known/jwt-issuer",
      "pub key in X.509 cert"
    ],
    "signingAlgorithms": [
      "ECDSA"
    ],
    "statusManagements": [
      "JWT/CWT status list"
    ],
    "trustManagements": [
      "Verifier knows Issuers",
      "X.509 certificates"
    ],
    "logo": "logos/lissi.png",
    "name": "Lissi Wallet",
    "openSource": false,
    "presentationProtocols": [
      "OpenID4VP"
    ],
    "type": "edge",
    "urlAppStore": "https://apps.apple.com/de/app/lissi-id-wallet/id6475958390",
    "urlGooglePlayStore": "https://play.google.com/store/apps/details?id=io.lissi.mobile.android&hl=de",
    "urlWebsite": "https://www.lissi.id/for-users",
    "id": "lissi-wallet",
    "commitHistory": "https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/lissi-wallet.json"
  },
  {
    "capability": [
      "holder"
    ],
    "company": "Mattr Limited",
    "credentialFormats": [
      "LDP-VC"
    ],
    "issuanceProtocols": [
      "OpenID4VCI"
    ],
    "keyManagements": [
      "did:key",
      "did:web"
    ],
    "logo": "logos/mattr-wallet.png",
    "name": "MATTR Showcase Wallet",
    "openSource": false,
    "signingAlgorithms": [
      "BBS+ with public key binding",
      "EdDSA"
    ],
    "type": "edge",
    "urlAppStore": "https://apps.apple.com/us/app/mattr-wallet/id1518660243",
    "urlGooglePlayStore": "https://play.google.com/store/apps/details?id=global.mattr.wallet",
    "urlWebsite": "https://learn.mattr.global/tutorials/wallets/overview",
    "id": "mattr-wallet",
    "commitHistory": "https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/mattr-wallet.json"
  },
  {
    "capability": [
      "holder"
    ],
    "company": "Meeco Group Pty Ltd",
    "companyUrl": "https://meeco.me/",
    "credentialFormats": [
      "JWT-VC",
      "SD-JWT-VC"
    ],
    "credentialProfiles": [
      "EBSI",
      "HAIP",
      "JWT VC Presentation Profile",
      "SD-JWT VCs (w/ X.509 for Issuers)"
    ],
    "issuanceProtocols": [
      "OpenID4VCI"
    ],
    "presentationProtocols": [
      "OpenID4VP"
    ],
    "keyManagements": [
      "did:key",
      "did:jwk",
      "raw public keys (jwk)"
    ],
    "license": "Commercial",
    "urlWebsite": "https://meeco.me/",
    "logo": "logos/meeco.png",
    "name": "Meeco Holder Wallet",
    "openSource": false,
    "signingAlgorithms": [
      "EdDSA",
      "ECDSA"
    ],
    "statusManagements": [
      "Status List 2021"
    ],
    "trustManagements": [
      "EBSI Trust Registries",
      "X.509 certificates"
    ],
    "type": "cloud",
    "id": "meeco-holder-wallet",
    "commitHistory": "https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/meeco-holder-wallet.json"
  },
  {
    "capability": [
      "issuer",
      "verifier"
    ],
    "company": "Meeco Group Pty Ltd",
    "companyUrl": "https://meeco.me/",
    "credentialFormats": [
      "JWT-VC",
      "SD-JWT-VC"
    ],
    "credentialProfiles": [
      "HAIP",
      "JWT VC Presentation Profile",
      "SD-JWT VCs (w/ X.509 for Issuers)"
    ],
    "issuanceProtocols": [
      "OpenID4VCI"
    ],
    "keyManagements": [
      "did:key",
      "did:jwk",
      "did:web",
      ".well-known/jwt-issuer",
      "pub key in X.509 cert",
      "raw public keys (jwk)"
    ],
    "urlWebsite": "https://meeco.me/",
    "license": "Commercial",
    "logo": "logos/meeco.png",
    "name": "Meeco Organisation Wallet",
    "openSource": false,
    "presentationProtocols": [
      "OpenID4VP"
    ],
    "signingAlgorithms": [
      "EdDSA",
      "ECDSA"
    ],
    "statusManagements": [
      "Status List 2021"
    ],
    "trustManagements": [
      "X.509 certificates"
    ],
    "type": "cloud",
    "id": "meeco-organisation-wallet",
    "commitHistory": "https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/meeco-organisation-wallet.json"
  },
  {
    "capability": [
      "issuer",
      "verifier"
    ],
    "company": "Microsoft",
    "credentialFormats": [
      "JWT-VC"
    ],
    "keyManagements": [
      "did:web"
    ],
    "logo": "logos/microsoft-entra.png",
    "name": "Microsoft Entra Verified ID",
    "openSource": false,
    "presentationProtocols": [
      "OpenID4VP"
    ],
    "statusManagements": [
      "Status List 2021"
    ],
    "type": "cloud",
    "urlWebsite": "https://www.microsoft.com/en-us/security/business/identity-access/microsoft-entra-verified-id",
    "id": "microsoft-entra",
    "commitHistory": "https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/microsoft-entra.json"
  },
  {
    "capability": [
      "holder"
    ],
    "company": "Metadium Technology Inc",
    "credentialFormats": [
      "JWT",
      "JWT-VC"
    ],
    "logo": "logos/mykeepin.png",
    "name": "Wepublic",
    "signingAlgorithms": [
      "ECDSA"
    ],
    "type": "edge",
    "urlWebsite": "https://metadium.com/Portfolio/DApp/Wallet",
    "urlAppStore": "https://apps.apple.com/kr/app/mykeepin-%EC%BD%94%EC%9D%B8%ED%94%8C%EB%9F%AC%EA%B7%B8-%EB%94%94%EC%A7%80%ED%84%B8-id/id1479166844",
    "urlGooglePlayStore": "https://play.google.com/store/apps/details?id=com.coinplug.mykeepin",
    "id": "mykeepin",
    "commitHistory": "https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/mykeepin.json"
  },
  {
    "capability": [
      "issuer",
      "holder",
      "verifier"
    ],
    "company": "MyNextID",
    "contact": "info@mynext.id",
    "name": "MyNextID",
    "urlWebsite": "https://mynext.id/",
    "id": "mynextid",
    "commitHistory": "https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/mynextid.json"
  },
  {
    "capability": [
      "issuer"
    ],
    "company": "Next ID",
    "logo": "logos/nextcert-issuer.png",
    "name": "NextCert Issuer",
    "urlWebsite": "https://nextid.com/nextcert-issuer/",
    "id": "nextcert-issuer",
    "commitHistory": "https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/nextcert-issuer.json"
  },
  {
    "capability": [
      "holder"
    ],
    "company": "Northern Block",
    "contact": "info@northernblock.io",
    "logo": "logos/orbit-edge-wallet.webp",
    "name": "Orbit Edge Wallet",
    "type": "edge",
    "urlAppStore": "https://apps.apple.com/us/app/orbit-edge/id1508037063",
    "urlGooglePlayStore": "https://play.google.com/store/apps/details?id=com.northernblock",
    "urlWebsite": "https://northernblock.io/orbit-edge-wallet/",
    "id": "orbit-edge-wallet",
    "commitHistory": "https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/orbit-edge-wallet.json"
  },
  {
    "capability": [
      "issuer",
      "verifier"
    ],
    "company": "Northern Block",
    "contact": "info@northernblock.io",
    "logo": "logos/orbit-enterprise.png",
    "name": "Orbit Enterprise",
    "urlWebsite": "https://northernblock.io/orbit-enterprise/",
    "id": "orbit-enterprise",
    "commitHistory": "https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/orbit-enterprise.json"
  },
  {
    "capability": [
      "issuer",
      "holder",
      "verifier"
    ],
    "company": "Bosch",
    "contact": "florin.coptil@bosch.com",
    "name": "Organization Wallet",
    "urlWebsite": "https://orgwallet.de/en/",
    "id": "organization-wallet",
    "commitHistory": "https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/organization-wallet.json"
  },
  {
    "capability": [
      "holder"
    ],
    "company": "Animo Solutions",
    "contact": "ana@animo.id",
    "credentialFormats": [
      "JWT-VC",
      "AnonCred",
      "SD-JWT-VC"
    ],
    "downloadSource": "https://github.com/animo/paradym-wallet",
    "issuanceProtocols": [
      "OpenID4VCI",
      "Issue Credential v2"
    ],
    "keyManagements": [
      "did:jwk",
      "did:key",
      "did:web",
      "did:cheqd",
      "did:indy"
    ],
    "logo": "logos/paradym-wallet.png",
    "name": "Paradym Wallet",
    "openSource": true,
    "presentationProtocols": [
      "OpenID4VP"
    ],
    "signingAlgorithms": [
      "EdDSA",
      "ECDSA"
    ],
    "type": "edge",
    "license": "Apache 2.0",
    "statusManagements": [
      "Indy Revocation",
      "JWT/CWT status list"
    ],
    "dependencies": [
      "credo",
      "sd-jwt-js"
    ],
    "credentialProfiles": [
      "AnonCreds with did:cheqd",
      "AnonCreds with did:indy",
      "Decentralized Identity Interop Profile"
    ],
    "urlAppStore": "https://apps.apple.com/nl/app/paradym-wallet/id6449846111?l=en",
    "urlGooglePlayStore": "https://play.google.com/store/apps/details?id=id.paradym.wallet",
    "urlWebsite": "https://docs.paradym.id/integrating-with-a-holder-wallet/paradym-wallet",
    "id": "paradym-wallet",
    "commitHistory": "https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/paradym-wallet.json"
  },
  {
    "capability": [
      "issuer",
      "verifier"
    ],
    "company": "Animo Solutions",
    "contact": "ana@animo.id",
    "credentialFormats": [
      "AnonCred",
      "SD-JWT-VC"
    ],
    "issuanceProtocols": [
      "OpenID4VCI",
      "Issue Credential v2"
    ],
    "keyManagements": [
      "did:jwk",
      "did:key",
      "did:web",
      "did:cheqd"
    ],
    "logo": "logos/paradym-wallet.png",
    "name": "Paradym",
    "openSource": false,
    "presentationProtocols": [
      "OpenID4VP"
    ],
    "signingAlgorithms": [
      "EdDSA",
      "ECDSA"
    ],
    "statusManagements": [
      "Indy Revocation",
      "JWT/CWT status list"
    ],
    "dependencies": [
      "credo",
      "sd-jwt-js"
    ],
    "credentialProfiles": [
      "AnonCreds with did:cheqd"
    ],
    "type": "cloud",
    "urlWebsite": "https://paradym.id",
    "id": "paradym",
    "commitHistory": "https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/paradym.json"
  },
  {
    "capability": [
      "holder",
      "verifier"
    ],
    "type": "edge",
    "name": "KeyShare",
    "logo": "logos/passivebolt-keyshare.webp",
    "company": "PassiveBolt",
    "companyUrl": "https://passivebolt.com",
    "urlWebsite": "https://passivebolt.com",
    "urlAppStore": "https://apps.apple.com/us/app/keyshare/id1628825811",
    "urlGooglePlayStore": "https://play.google.com/store/apps/details?id=com.passivebolt.keyshare&hl=en_US&pli=1",
    "openSource": false,
    "license": "",
    "portability": false,
    "credentialProfiles": [
      "ISO mDL",
      "JSON-LD VCs with BBS (Credential is Secret)",
      "JSON-LD VCs with BBS (Holder DID)",
      "JWT VC Presentation Profile 2",
      "JWT VC Presentation Profile",
      "SD-JWT VCs (w/ X.509 for Issuers)"
    ],
    "credentialFormats": [
      "CWT",
      "JWT-VC",
      "JWT",
      "LDP-VC",
      "MDOC",
      "SD-JWT-VC",
      "SD-JWT",
      "VC (1.1)"
    ],
    "issuanceProtocols": [
      "ISO 23220-3",
      "OpenID4VCI"
    ],
    "keyManagements": [],
    "presentationProtocols": [
      "OpenID4VP",
      "Present Proof v2",
      "Present Proof v1.0"
    ],
    "signingAlgorithms": [
      "BBS+ with public key binding",
      "ECDSA",
      "EdDSA"
    ],
    "statusManagements": [
      "Status List 2021"
    ],
    "trustManagements": [
      "OpenID Connect Federation",
      "X.509 certificates"
    ],
    "id": "passivebolt-keyshare",
    "commitHistory": "https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/passivebolt-keyshare.json"
  },
  {
    "capability": [
      "holder"
    ],
    "company": "UFW Foundation",
    "companyUrl": "https://ufwfoundation.org/",
    "credentialFormats": [
      "AnonCred"
    ],
    "credentialProfiles": [
      "AnonCreds with did:cheqd",
      "AnonCreds with did:indy"
    ],
    "issuanceProtocols": [
      "Issue Credential v2"
    ],
    "keyManagements": [
      "did:cheqd",
      "did:indy",
      "did:peer",
      "did:web",
      "link secrets"
    ],
    "license": "Proprietary",
    "name": "Preparese Mobile",
    "openSource": false,
    "portability": false,
    "signingAlgorithms": [
      "CL",
      "EdDSA"
    ],
    "statusManagements": [],
    "trustManagements": [
      "Verifier knows Issuers"
    ],
    "type": "edge",
    "urlWebsite": "https://www.preparese.info/",
    "id": "preparese-mobile",
    "commitHistory": "https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/preparese-mobile.json"
  },
  {
    "name": "Procivis One Wallet",
    "logo": "logos/procivis-one.png",
    "company": "Procivis AG",
    "companyUrl": "https://www.procivis.ch",
    "type": "edge",
    "openSource": false,
    "license": "Proprietary",
    "capability": [
      "holder"
    ],
    "portability": true,
    "urlWebsite": "https://www.procivis.ch/en/procivis-one",
    "credentialProfiles": [
      "ISO mDL",
      "JSON-LD VCs with BBS (Holder DID)"
    ],
    "credentialFormats": [
      "JWT-VC",
      "LDP-VC",
      "MDOC",
      "SD-JWT-VC"
    ],
    "issuanceProtocols": [
      "OpenID4VCI"
    ],
    "keyManagements": [
      "did:jwk",
      "did:key",
      "did:web",
      "pub key in X.509 cert"
    ],
    "presentationProtocols": [
      "OpenID4VP"
    ],
    "signingAlgorithms": [
      "BBS+ with public key binding",
      "ECDSA",
      "EdDSA"
    ],
    "statusManagements": [
      "Status List 2021",
      "Validity Credential"
    ],
    "trustManagements": [],
    "id": "procivis-one-wallet",
    "commitHistory": "https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/procivis-one-wallet.json"
  },
  {
    "name": "Procivis One",
    "logo": "logos/procivis-one.png",
    "company": "Procivis AG",
    "companyUrl": "https://www.procivis.ch",
    "type": "cloud",
    "openSource": false,
    "license": "Proprietary",
    "capability": [
      "issuer",
      "holder",
      "verifier"
    ],
    "portability": true,
    "urlWebsite": "https://www.procivis.ch/en/procivis-one",
    "credentialProfiles": [
      "ISO mDL",
      "JSON-LD VCs with BBS (Holder DID)"
    ],
    "credentialFormats": [
      "JWT-VC",
      "LDP-VC",
      "MDOC",
      "SD-JWT-VC"
    ],
    "issuanceProtocols": [
      "OpenID4VCI"
    ],
    "keyManagements": [
      "did:jwk",
      "did:key",
      "did:web",
      "pub key in X.509 cert"
    ],
    "presentationProtocols": [
      "OpenID4VP"
    ],
    "signingAlgorithms": [
      "BBS+ with public key binding",
      "ECDSA",
      "EdDSA"
    ],
    "statusManagements": [
      "Status List 2021",
      "Validity Credential"
    ],
    "trustManagements": [],
    "id": "procivis-one",
    "commitHistory": "https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/procivis-one.json"
  },
  {
    "capability": [
      "issuer",
      "verifier"
    ],
    "company": "Indicio",
    "name": "Proven",
    "openSource": false,
    "logo": "logos/proven.png",
    "type": "cloud",
    "urlWebsite": "https://indicio.tech/indicio-proven/",
    "id": "proven",
    "commitHistory": "https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/proven.json"
  },
  {
    "capability": [
      "holder"
    ],
    "company": "SelfKey",
    "downloadSource": "https://github.com/SelfKeyFoundation/Identity-Wallet",
    "license": "MIT",
    "name": "SelfKey Wallet",
    "type": "edge",
    "urlAppStore": "https://selfkey.org/selfkey-wallet-ios-download",
    "urlGooglePlayStore": "https://selfkey.org/selfkey-wallet-android-download",
    "urlWebsite": "https://selfkey.org/selfkey-wallet/",
    "id": "selfkey-wallet",
    "commitHistory": "https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/selfkey-wallet.json"
  },
  {
    "capability": [
      "issuer",
      "verifier"
    ],
    "company": "esatus AG",
    "credentialFormats": [
      "AnonCred"
    ],
    "credentialProfiles": [
      "AnonCreds with did:indy"
    ],
    "logo": "logos/esatus-wallet.png",
    "name": "SOWL",
    "type": "cloud",
    "urlWebsite": "https://esatus.com/en/digital-identity/",
    "id": "sowl",
    "commitHistory": "https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/sowl.json"
  },
  {
    "capability": [
      "holder"
    ],
    "company": "Sphereon",
    "credentialFormats": [
      "JWT",
      "JWT-VC",
      "LDP-VC"
    ],
    "downloadSource": "https://github.com/Sphereon-Opensource/ssi-mobile-wallet",
    "issuanceProtocols": [
      "OpenID4VCI"
    ],
    "keyManagements": [
      "did:jwk",
      "did:key",
      "did:cheqd",
      "did:web",
      "pub key in X.509 cert"
    ],
    "license": "GPL 3.0",
    "logo": "logos/sphereon-wallet.png",
    "name": "Sphereon Wallet",
    "openSource": true,
    "presentationProtocols": [
      "OpenID4VP"
    ],
    "signingAlgorithms": [
      "BBS+ with public key binding",
      "ECDSA",
      "EdDSA",
      "RSA"
    ],
    "statusManagements": [
      "Status List 2021"
    ],
    "type": "edge",
    "urlAppStore": "https://apps.apple.com/us/app/sphereon-wallet/id1661096796",
    "urlGooglePlayStore": "https://play.google.com/store/apps/details?id=com.sphereon.ssi.wallet",
    "urlWebsite": "https://sphereon.com/sphereon-products/sphereon-wallet/",
    "id": "sphereon-wallet",
    "commitHistory": "https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/sphereon-wallet.json"
  },
  {
    "capability": [
      "issuer",
      "holder",
      "verifier"
    ],
    "company": "Spherity GmbH",
    "credentialFormats": [
      "AnonCred",
      "LDP-VC"
    ],
    "issuanceProtocols": [
      "OpenID4VCI",
      "Issue Credential v2"
    ],
    "logo": "logos/spherity-wallet.png",
    "name": "Spherity Wallet",
    "openSource": false,
    "presentationProtocols": [
      "OpenID4VP"
    ],
    "signingAlgorithms": [
      "CL",
      "BBS+ with public key binding",
      "EdDSA"
    ],
    "statusManagements": [
      "Status List 2021"
    ],
    "type": "edge",
    "urlWebsite": "https://www.spherity.com/enterprise-identity-wallet",
    "id": "spherity-wallet",
    "commitHistory": "https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/spherity-wallet.json"
  },
  {
    "capability": [
      "holder"
    ],
    "company": "Talao",
    "credentialFormats": [
      "JWT-VC",
      "LDP-VC"
    ],
    "credentialProfiles": [
      "EBSI"
    ],
    "downloadSource": "https://github.com/TalaoDAO/talao-wallet",
    "issuanceProtocols": [
      "OpenID4VCI"
    ],
    "keyManagements": [
      "did:ebsi",
      "did:web",
      "did:key"
    ],
    "license": "Apache 2.0",
    "logo": "logos/talao.png",
    "name": "Talao Wallet",
    "openSource": true,
    "presentationProtocols": [
      "OpenID4VP"
    ],
    "signingAlgorithms": [
      "ECDSA"
    ],
    "statusManagements": [
      "Status List 2021"
    ],
    "type": "edge",
    "urlAppStore": "https://apps.apple.com/app/talao-wallet/id1582183266#?platform=iphone",
    "urlGooglePlayStore": "https://play.google.com/store/apps/details?id=co.talao.wallet",
    "urlWebsite": "https://talao.io/",
    "id": "talao",
    "commitHistory": "https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/talao.json"
  },
  {
    "capability": [
      "holder"
    ],
    "company": "Trinsic",
    "downloadSource": "https://github.com/trinsic-id/wallet-reference-app",
    "logo": "logos/trisic-id.png",
    "name": "Trinsic ID",
    "openSource": true,
    "type": "edge",
    "urlAppStore": "https://apps.apple.com/us/app/trinsic-id/id1475160728",
    "urlGooglePlayStore": "https://play.google.com/store/apps/details?id=id.streetcred.apps.mobile",
    "urlWebsite": "https://trinsic.id/an-introduction-to-the-trinsic-wallet/",
    "id": "trisic-id",
    "commitHistory": "https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/trisic-id.json"
  },
  {
    "capability": [
      "issuer",
      "verifier"
    ],
    "company": "Trinsic",
    "logo": "logos/trisic-platform.png",
    "name": "Trinsic Platform",
    "type": "cloud",
    "urlWebsite": "https://trinsic.id/platform/",
    "id": "trisic-platform",
    "commitHistory": "https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/trisic-platform.json"
  },
  {
    "capability": [
      "holder"
    ],
    "company": "Verida",
    "logo": "logos/verida.svg",
    "name": "Verida Wallet",
    "type": "edge",
    "urlAppStore": "https://apps.apple.com/tr/app/verida-wallet/id1546599632",
    "urlGooglePlayStore": "https://play.google.com/store/apps/details?id=io.verida.vault",
    "urlWebsite": "https://www.verida.io/",
    "id": "verida",
    "commitHistory": "https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/verida.json"
  },
  {
    "capability": [
      "issuer",
      "verifier"
    ],
    "company": "Validated ID",
    "logo": "logos/vidcredentials.svg",
    "name": "VIDcredentials",
    "type": "cloud",
    "urlWebApp": "https://try.vidchain.net/demo",
    "urlWebsite": "https://www.validatedid.com/en/vidchain/vidcredentials",
    "id": "vidcredentials",
    "commitHistory": "https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/vidcredentials.json"
  },
  {
    "capability": [
      "holder"
    ],
    "company": "Cleverbase",
    "credentialFormats": [
      "x509",
      "JWT"
    ],
    "contact": "klantenservice@vidua.nl",
    "issuanceProtocols": [
      "OpenID4VCI"
    ],
    "logo": "logos/vidua.png",
    "name": "Vidua",
    "openSource": false,
    "portability": false,
    "presentationProtocols": [
      "OpenID4VP"
    ],
    "signingAlgorithms": [
      "ECDSA",
      "RSA"
    ],
    "type": "edge",
    "urlAppStore": "https://apps.apple.com/en/app/vidua/id6443842104",
    "urlGooglePlayStore": "https://play.google.com/store/apps/details?id=nl.vidua.wallet",
    "urlWebsite": "https://vidua.nl/english/",
    "id": "vidua",
    "commitHistory": "https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/vidua.json"
  },
  {
    "capability": [
      "holder"
    ],
    "company": "Validated ID",
    "credentialFormats": [
      "JWT-VC",
      "LDP-VC",
      "JWT"
    ],
    "issuanceProtocols": [
      "OpenID4VCI"
    ],
    "keyManagements": [
      "did:key",
      "did:jwk",
      "did:ebsi"
    ],
    "logo": "logos/VIDwallet.png",
    "name": "VIDwallet",
    "openSource": false,
    "presentationProtocols": [
      "OpenID4VP"
    ],
    "signingAlgorithms": [
      "ECDSA",
      "EdDSA"
    ],
    "statusManagements": [
      "Status List 2021"
    ],
    "type": "edge",
    "urlAppStore": "https://apps.apple.com/si/app/vidwallet/id1554340592",
    "urlGooglePlayStore": "https://play.google.com/store/apps/details?id=com.validatedid.wallet&hl=en_US&gl=US",
    "urlWebsite": "https://www.validatedid.com/en/vidchain/vidwallet",
    "id": "vidwallet",
    "commitHistory": "https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/vidwallet.json"
  },
  {
    "capability": [
      "holder",
      "issuer",
      "verifier"
    ],
    "company": "walt.id",
    "credentialFormats": [
      "JWT",
      "LDP-VC",
      "SD-JWT"
    ],
    "credentialProfiles": [
      "EBSI"
    ],
    "downloadSource": "https://github.com/walt-id/waltid-identity",
    "issuanceProtocols": [
      "OpenID4VCI"
    ],
    "keyManagements": [
      "did:key",
      "did:web",
      "did:ebsi",
      "did:jwk",
      "did:cheqd"
    ],
    "license": "Apache 2.0",
    "logo": "logos/walt-id.png",
    "name": "walt.id",
    "openSource": true,
    "presentationProtocols": [
      "OpenID4VP"
    ],
    "signingAlgorithms": [
      "ECDSA",
      "EdDSA",
      "RSA"
    ],
    "statusManagements": [
      "Status List 2021"
    ],
    "type": "cloud",
    "urlWebApp": "https://wallet.walt.id/",
    "urlWebsite": "https://walt.id/",
    "id": "walt.id",
    "commitHistory": "https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/walt.id.json"
  },
  {
    "capability": [
      "holder"
    ],
    "company": "GUnet",
    "credentialFormats": [
      "JWT-VC"
    ],
    "credentialProfiles": [
      "EBSI"
    ],
    "downloadSource": "https://github.com/wwWallet",
    "logo": "logos/wwwallet.png",
    "name": "wwWallet",
    "openSource": true,
    "type": "cloud",
    "urlWebApp": "https://demo.wwwallet.org/",
    "urlWebsite": "https://wwwallet.github.io/wallet-docs/",
    "id": "wwwallet",
    "commitHistory": "https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/wwwallet.json"
  },
  {
    "capability": [
      "holder"
    ],
    "company": "Privacy by Design Foundation",
    "credentialFormats": [
      "Idemix attribute-based credential"
    ],
    "credentialProfiles": [
      "IRMA (Yivi) wallet"
    ],
    "downloadSource": "https://github.com/privacybydesign/irmamobile/",
    "license": "GPLv3",
    "logo": "logos/yivi.png",
    "name": "Yivi",
    "openSource": true,
    "signingAlgorithms": [
      "CL"
    ],
    "type": "edge",
    "urlAppStore": "https://itunes.apple.com/nl/app/irma-authentication/id1294092994",
    "urlGooglePlayStore": "https://play.google.com/store/apps/details?id=org.irmacard.cardemu",
    "urlWebsite": "https://irma.app/docs/yivi-app/",
    "id": "yivi",
    "commitHistory": "https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/yivi.json"
  },
  {
    "capability": [
      "holder"
    ],
    "company": "ZADA Solutions",
    "credentialFormats": [
      "AnonCred"
    ],
    "credentialProfiles": [
      "AnonCreds with did:indy"
    ],
    "downloadSource": "https://github.com/lycheeventures/zada-wallet",
    "license": "CC BY NC SA",
    "logo": "logos/zada.png",
    "name": "ZADA",
    "openSource": true,
    "signingAlgorithms": [
      "CL",
      "RSA"
    ],
    "statusManagements": [
      "Indy Revocation"
    ],
    "type": "edge",
    "urlAppStore": "https://apps.apple.com/us/app/zada-wallet/id1578666669",
    "urlGooglePlayStore": "https://play.google.com/store/apps/details?id=com.zadanetwork.wallet",
    "urlWebsite": "https://zada.io/",
    "id": "zada",
    "commitHistory": "https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/zada.json"
  }
];
