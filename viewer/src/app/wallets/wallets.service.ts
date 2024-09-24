import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { FieldResponse, Resource, ResourceType, Wallet } from './types';
import schema from '../../assets/schema.json';
import { walletData } from './wallets-data';
import { CaseStudiesService } from '../case-studies/case-studies.service';
import { DependenciesService } from '../dependencies/dependencies.service';

@Injectable({
  providedIn: 'root',
})
export class WalletsService {
  resources: Resource[] = [
    {
      id: 'credentialProfiles',
      schemaId: 'Credential-Profile',
      name: 'Supported Profiles',
    },
    {
      id: 'credentialFormats',
      schemaId: 'Credential-Format',
      name: 'Supported Formats',
    },
    {
      id: 'issuanceProtocols',
      schemaId: 'Issuance-Protocol',
      name: 'Supported Issuance Protocols',
    },
    {
      id: 'keyManagements',
      schemaId: 'Key-Management',
      name: 'Supported Key Managements',
    },
    {
      id: 'presentationProtocols',
      schemaId: 'Presentation-Protocol',
      name: 'Supported Presentation Protocols',
    },
    {
      id: 'signingAlgorithms',
      schemaId: 'Signing-Algorithm',
      name: 'Supported Signing Algorithms',
    },
    {
      id: 'statusManagements',
      schemaId: 'Status-Algorithm',
      name: 'Supported Status Managements',
    },
    {
      id: 'trustManagements',
      schemaId: 'Trust-Management',
      name: 'Supported Trust Managements',
    },
  ];

  constructor(
    private httpClient: HttpClient,
    private caseStudiesService: CaseStudiesService,
    private depenciesService: DependenciesService
  ) {}

  /**
   * Loads the wallets from the assets folder
   * @returns
   */
  loadWallets() {
    return walletData;
  }

  getCaseStudies(wallet: Wallet) {
    return this.caseStudiesService.getByWallet(wallet);
  }

  getDependencies(wallet: Wallet) {
    return this.depenciesService.getByWallet(wallet);
  }

  /**
   * Gets the definitions from the Credential Profile comparison SIG
   * @returns
   */
  async getDefinitions() {
    return firstValueFrom(
      this.httpClient.get<FieldResponse>(
        'https://openwallet-foundation.github.io/credential-format-comparison-sig/assets/schemas/fields.json'
      )
    );
  }

  find(name: string) {
    return this.loadWallets().find((wallet) => wallet.name === name);
  }

  /**
   * Returns the link to the resource to the credential comparison SIG
   * @param resourceType
   * @param key
   * @returns
   */
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

  /**
   * Returns the tooltip for the resource
   * @param resourceType
   * @returns
   */
  getTooltip(resourceType: keyof typeof schema.properties) {
    return schema.properties[resourceType].description;
  }

  /**
   * Returns the logo url. It's either an absolute url or a relative path to the assets folder
   * @param url
   * @returns
   */
  getLogo(url?: string) {
    if (!url) return;
    if (url.startsWith('http')) return url;
    return `assets/${url}`;
  }
}
