export interface Resources {
  'Credential Profile': Format;
  'Credential Format': Format;
  'Key Management': Format;
  'Status Algorithm': Format;
  'Signing Algorithm': Format;
  'Issuance Protocol': Format;
  'Presentation Protocol': Format;
  'Trust Management': Format;
}

export interface IProfile {
  $schema: string;
  Name: string;
  'Credential Profile Description': string;
  'Credential Format': string;
  'Signing Algorithm': string;
  'Status Algorithm': string;
  'Key Management (Issuer)': string;
  'Key Management (Holder)': string;
  'Issuance Protocol': string;
  'Presentation Protocol': string;
  'Trust Management': string;
  'Formal Specification'?: string;
}

export interface Format {
  structure: Structure;
  values: { [key: string]: Partial<any> };
}

export interface Structure {
  type: string;
  additionalProperties: boolean;
  properties: Properties;
  required: string[];
  title: string;
}

export class Properties {
  [key: string]: any;
}
export interface Property {
  type: string | string[];
  description: string;
}
