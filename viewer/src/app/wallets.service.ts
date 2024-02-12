import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Wallet } from './types';
import { values } from './tooltip';

export type ResourceType =
  | 'credentialProfiles'
  | 'credentialFormats'
  | 'issuanceProtocols'
  | 'keyManagements'
  | 'presentationProtocols'
  | 'signingAlgorithms'
  | 'statusManagements'
  | 'trustManagements';

interface Resource {
  // unique identifier of the column
  id: ResourceType;
  // unique identifier of the schema
  schemaId: string;
  // name of the column
  name: string;
  //tooltip to show to the user
  tooltip: string;
}

@Injectable({
  providedIn: 'root',
})
export class WalletsService {
  resources: Resource[] = [
    {
      id: 'credentialProfiles',
      schemaId: 'Credential-Profile',
      name: 'Supported Profiles',
      tooltip: 'Supported profiles',
    },
    {
      id: 'credentialFormats',
      schemaId: 'Credential-Format',
      name: 'Supported Formats',
      tooltip: 'Supported formats',
    },
    {
      id: 'issuanceProtocols',
      schemaId: 'Issuance-Protocol',
      name: 'Supported Issuance Protocols',
      tooltip: 'Supported issuance protocols',
    },
    {
      id: 'keyManagements',
      schemaId: 'Key-Management',
      name: 'Supported Key Managements',
      tooltip: 'Supported key managements',
    },
    {
      id: 'presentationProtocols',
      schemaId: 'Presentation-Protocol',
      name: 'Supported Presentation Protocols',
      tooltip: 'Supported presentation protocols',
    },
    {
      id: 'signingAlgorithms',
      schemaId: 'Signing-Algorithm',
      name: 'Supported Signing Algorithms',
      tooltip: 'Supported signing algorithms',
    },
    {
      id: 'statusManagements',
      schemaId: 'Status-Management',
      name: 'Supported Status Managements',
      tooltip: 'Supported status managements',
    },
    {
      id: 'trustManagements',
      schemaId: 'Trust-Management',
      name: 'Supported Trust Managements',
      tooltip: 'Supported trust managements',
    },
  ];

  constructor(private httpClient: HttpClient) {}

  loadWallets() {
    return firstValueFrom(this.httpClient.get<Wallet[]>('assets/wallets.json'));
  }

  find(name: string) {
    return this.loadWallets().then((wallets) =>
      wallets.find((wallet) => wallet.name === name)
    );
  }

  getLink(resourceType: ResourceType, key: string) {
    const url =
      'https://openwallet-foundation.github.io/credential-format-comparison-sig/#';
    switch (resourceType) {
      case 'credentialProfiles':
        return `${url}/profiles/${key}`;
      case 'credentialFormats':
        return `${url}/resources/Credential%20Format/${key}`;
      case 'issuanceProtocols':
        return `${url}/resources/Issuance%20Protocol/${key}`;
      case 'keyManagements':
        return `${url}/resources/Key%20Management/${key}`;
      case 'presentationProtocols':
        return `${url}/resources/Presentation%20Protocol/${key}`;
      case 'signingAlgorithms':
        return `${url}/resources/Signing%20Algorithm/${key}`;
      case 'statusManagements':
        return `${url}/resources/Status%20Management/${key}`;
      case 'trustManagements':
        return `${url}/resources/Trust%20Management/${key}`;
    }
  }

  getTooltip(resourceType: keyof typeof values) {
    return values[resourceType];
  }
}
