import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Wallet } from './types';

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
      name: 'Supported Profiles',
      tooltip: 'Supported profiles',
    },
    {
      id: 'credentialFormats',
      name: 'Supported Formats',
      tooltip: 'Supported formats',
    },
    {
      id: 'issuanceProtocols',
      name: 'Supported Issuance Protocols',
      tooltip: 'Supported issuance protocols',
    },
    {
      id: 'keyManagements',
      name: 'Supported Key Managements',
      tooltip: 'Supported key managements',
    },
    {
      id: 'presentationProtocols',
      name: 'Supported Presentation Protocols',
      tooltip: 'Supported presentation protocols',
    },
    {
      id: 'signingAlgorithms',
      name: 'Supported Signing Algorithms',
      tooltip: 'Supported signing algorithms',
    },
    {
      id: 'statusManagements',
      name: 'Supported Status Managements',
      tooltip: 'Supported status managements',
    },
    {
      id: 'trustManagements',
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
      default:
        throw new Error(`Unknown resource type: ${resourceType}`);
    }
  }
}
