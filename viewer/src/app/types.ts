export interface Wallet {
  // name of the wallet
  name: string;
  // url to the website of the wallet with more information
  urlWebsite: string;
  // url to the logo of the wallet
  logo?: string;
  // name of the company. In case it's a community project, the name of the community
  company: string;
  // url to the company, not the url to the product
  companyUrl?: string;
  //provide a link to a contact formular or insert an email address for support requests
  contact?: string;
  // is the wallet open source
  openSource: boolean;
  // if the wallet is open source, provide the url to the source code, like a github link
  downloadSource?: string;
  // add the license of the wallet. In case you have multiple licences, add them here.
  license?: string;
  // is the wallet capable of the holder role
  holderCapability?: boolean;
  // is the wallet capable of the issuer role
  issuerCapability?: boolean;
  // is the wallet capable of the verifier role
  verifierCapability?: boolean;
  // it is a cloud or mobile wallet
  type?: 'cloud' | 'mobile';
  // am I able to export my data from the wallet/agent and import them into another device/system
  portability?: boolean;
  // link to the app store from apple
  urlAppStore?: string;
  // link to the play store from google
  urlGooglePlayStore?: string;
  // link to the web app in case it's not a mobile wallet
  urlWebApp?: string;
  //TODO: do we need a link to the windows play store in case you can download it from the windows store?
  // which profiles from the credential profile comparison SIG are supported
  credentialProfiles?: string[];
  // which formats from the credential format comparison SIG are supported
  credentialFormats?: string[];
}
