import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { FieldResponse, Resource, ResourceType, Wallet } from './types';
import schema from '../../assets/schemas/wallet.json';
import { walletData } from './wallets-data';
import { CaseStudiesService } from '../case-studies/case-studies.service';
import { DependenciesService } from '../dependencies/dependencies.service';
import fields from '../../assets/schemas/fields.json';
import { AppService } from '../credential-profiles/app.service';

type ErrorFile = Record<
  'wallets' | 'case-studies' | 'dependencies',
  Record<string, Record<string, string>>
>;

@Injectable({
  providedIn: 'root',
})
export class WalletsService {
  private httpClient = inject(HttpClient);
  private caseStudiesService = inject(CaseStudiesService);
  private depenciesService = inject(DependenciesService);
  private appService = inject(AppService);

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

  errors!: Record<string, Record<string, string>>;

  constructor() {
    this.errors = {};
    this.init();
  }

  async init() {
    this.getErrors().then(
      errors => (this.errors = errors),
      err => console.log(err)
    );
  }

  /**
   * Loads the wallets from the assets folder
   * @returns
   */
  loadWallets() {
    // can be optimized
    walletData.map(data => {
      // loop over the profiles and add the values to the resource if not included yet
      data.credentialProfiles?.forEach(profileName => {
        const profile = this.appService.getProfile(profileName);
        this.appService.extraValues.forEach(resourceKey => {
          const resource = profile[resourceKey] as string;
          const mappedKey = this.appService.mappedValues[resourceKey];
          let values = data[mappedKey as keyof Wallet] as string[];
          if (values === undefined) {
            values = [];
          }
          if (!values.includes(resource)) {
            values.push(resource);
          }
          (data[mappedKey as keyof Wallet] as string[]) = values;
        });
      });
      return data;
    });
    return walletData;
  }

  /**
   * Returns all case studies that are connected to this wallet or agent.
   * @param wallet
   * @returns
   */
  getCaseStudies(wallet: Wallet) {
    return this.caseStudiesService.getByWallet(wallet);
  }

  /**
   * Returns all depdendencies that belong to this wallet or agent.
   * @param wallet
   * @returns
   */
  getDependencies(wallet: Wallet) {
    return this.depenciesService.getByWallet(wallet);
  }

  /**
   * Returns the company name of a wallet or agent.
   * @param id
   * @returns
   */
  getCompany(id: string) {
    return this.loadWallets().find(wallet => wallet.id === id)?.company;
  }

  /**
   * Gets the definitions from the Credential Profile comparison SIG
   * @returns
   */
  async getDefinitions() {
    return fields as FieldResponse;
  }

  find(id: string) {
    return this.loadWallets().find(wallet => wallet.id === id);
  }

  /**
   * Returns the link to the resource to the credential comparison SIG
   * @param resourceType
   * @param key
   * @returns
   */
  getLink(resourceType: ResourceType, key: string) {
    const url = '';
    // encodeURIComponent doesn't encode () but Angular router treats them as auxiliary route syntax
    const encodedKey = encodeURIComponent(key).replaceAll('(', '%28').replaceAll(')', '%29');
    switch (resourceType) {
      case 'credentialProfiles':
        return `${url}/credential-profiles/${encodedKey}`;
      case 'credentialFormats':
        return `${url}/resources/Credential%20Format/${encodedKey}`;
      case 'issuanceProtocols':
        return `${url}/resources/Issuance%20Protocol/${encodedKey}`;
      case 'keyManagements':
        return `${url}/resources/Key%20Management/${encodedKey}`;
      case 'presentationProtocols':
        return `${url}/resources/Presentation%20Protocol/${encodedKey}`;
      case 'signingAlgorithms':
        return `${url}/resources/Signing%20Algorithm/${encodedKey}`;
      case 'statusManagements':
        return `${url}/resources/Status%20Management/${encodedKey}`;
      case 'trustManagements':
        return `${url}/resources/Trust%20Management/${encodedKey}`;
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

  /**
   * It will check the error branch of the repo where the error messages are located.
   * @param id name of the wallet
   */
  invalidEntry(id: string) {
    if (!this.errors || !this.errors[id]) return '';
    return Object.keys(this.errors[id])
      .map(key => `${key}: ${this.errors[id][key]}`)
      .join(', ');
  }

  /**
   * Get the errors from the error file
   * @returns
   */
  getErrors(): Promise<Record<string, Record<string, string>>> {
    //TODO: right now this has to be called with every call to get the errors. This should be fixed.
    return this.errors
      ? Promise.resolve(this.errors)
      : firstValueFrom(
          this.httpClient.get<ErrorFile>(
            `https://raw.githubusercontent.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/refs/heads/errors/errors.json`
          )
        ).then(res => (this.errors = res.wallets));
  }
}
