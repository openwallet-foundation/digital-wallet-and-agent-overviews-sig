export type Capability = 'holder' | 'issuer' | 'verifier';

export type WalletType = 'cloud' | 'mobile';

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
  // is the wallet capable of multiple roles
  capability?: Capability[];
  // it is a cloud or mobile wallet
  type?: WalletType;
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
  // which issuance protocols from the issuance protocol comparison SIG are supported
  issuanceProtocols?: string[];
  // which key management from the key management comparison SIG are supported
  keyManagements?: string[];
  // which presentation protocols from the presentation protocol comparison SIG are supported
  presentationProtocols?: string[];
  // which signing algorithms from the signing algorithm comparison SIG are supported
  signingAlgorithms?: string[];
  // which status management from the status management comparison SIG are supported
  statusManagements?: string[];
  // which trust management from the trust management comparison SIG are supported
  trustManagements?: string[];
}
export interface Definition {
  description: string;
  type: string;
  enum: string[];
}
export interface FieldResponse {
  $schema: 'http://json-schema.org/draft-06/schema#';
  type: 'object';
  additionalProperties: {};
  definitions: { [key: string]: Definition };
}

/**
 * Type of the resource
 */
export type ResourceType =
  | 'credentialProfiles'
  | 'credentialFormats'
  | 'issuanceProtocols'
  | 'keyManagements'
  | 'presentationProtocols'
  | 'signingAlgorithms'
  | 'statusManagements'
  | 'trustManagements';

/**
 * Information from resources from the credential comparison SIG
 */
export interface Resource {
  // unique identifier of the column
  id: ResourceType;
  // unique identifier of the schema
  schemaId: string;
  // name of the column
  name: string;
}
