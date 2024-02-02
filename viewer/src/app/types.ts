export interface Wallet {
  aip: Aip;
  api: Aip;
  blockchainPurpose: string;
  blockchainType: string;
  blockchainUsed: Aip;
  company: string;
  connectionTypes: string;
  credExchangeProtocol: string;
  credentialFormat: string;
  cryptoAgility: Aip;
  ddip: Aip;
  deepLinking: Aip;
  deployment: Aip;
  downloadSource?: Aip;
  eassi: Eassi;
  ebsi: Aip;
  encodingScheme: string;
  hardwareSupport: Aip;
  holderCapability: Aip;
  identifierHolder: string;
  identifierIssuer: string;
  issuerCapability: Aip;
  keyHistoryHolder: Aip;
  keyHistoryIssuer: Aip;
  keyRotationHolder: Aip;
  keyRotationIssuer: Aip;
  logo: string;
  mdoc: Mdoc;
  name: string;
  observability: Aip;
  offlineFriendly: Aip;
  openSource: string;
  organisationalWallet: OrganisationalWallet;
  peer2PeerProtocols: string;
  portability: Aip;
  predicates: Aip;
  quantumSafe: Aip;
  revocationAlgorithm: string;
  scope: Scope;
  selectiveDisclosure: Aip;
  signatureAlgorithm: string;
  support: Support;
  urlAppStore: string;
  urlGooglePlayStore: string;
  urlWebApp: string;
  urlWebsite: string;
  verifierCapability: Aip;
  verifierUnlinkability: Aip;
}

export enum Aip {
  DependingOn = 'Depending on ...',
  Empty = '-',
  No = 'No',
  Yes = 'Yes',
  YesImplemntationAccordingToARF = 'Yes, implemntation according to ARF',
  YesNFCHWW = 'Yes, NFC HWW',
}

export enum Eassi {
  No = 'No',
  Soon = 'Soon',
  Yes = 'Yes',
}

export enum Mdoc {
  Empty = '-',
  Planned = 'Planned',
}

export enum OrganisationalWallet {
  Empty = '-',
  YesButBrandedAsEnterpriseWalletPlatformByIGrantIo = 'Yes, but branded as Enterprise Wallet Platform by iGrant.io',
}

export enum Scope {
  Empty = '-',
  TravelHospitalityAccessControl = 'Travel, Hospitality, Access Control',
}

export enum Support {
  Empty = '-',
  SupportIgrantIo = 'support@igrant.io',
}
