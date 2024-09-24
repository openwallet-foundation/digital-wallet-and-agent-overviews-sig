import { Injectable } from '@angular/core';
import { Wallet } from '../wallets/types';
import { dependencyData } from './dependencies-data';
import schema from '../../assets/dependency.schema.json';
import { Dependency } from './types';
import { walletData } from '../wallets/wallets-data';

@Injectable({
  providedIn: 'root',
})
export class DependenciesService {
  getDependencies(): Dependency[] {
    return dependencyData;
  }

  /**
   * Returns all licenses that are used by the dependencies
   */
  getLicenses(): string[] {
    const licenses: string[] = [];
    this.getDependencies().forEach((dependency) => {
      if (dependency.license && !licenses.includes(dependency.license)) {
        licenses.push(dependency.license);
      }
    });
    return licenses;
  }

  /**
   * Returns all lanugages that are used by the dependencies
   * @returns
   */
  getLaguages(): string[] {
    const languages: string[] = [];
    this.getDependencies().forEach((dependency) => {
      if (dependency.language && !languages.includes(dependency.language)) {
        languages.push(dependency.language);
      }
    });
    return languages;
  }

  /**
   * Returns the dependencies of a wallet by filtering the dependencyData array by the wallet dependencies
   * @param wallet
   * @returns
   */
  getByWallet(wallet: Wallet) {
    if (!wallet.dependencies) return [];
    return dependencyData.filter((dependency) =>
      (wallet.dependencies as string[]).includes(dependency.name)
    );
  }

  /**
   * Returns the wallets that depend on the given dependency
   * @param name
   * @returns
   */
  getWallets(name: string) {
    return walletData.filter((wallet) =>
      (wallet.dependencies as string[])?.includes(name)
    );
  }

  /**
   * Returns the tooltip for the resource
   * @param resourceType
   * @returns
   */
  getTooltip(resourceType: keyof typeof schema.properties) {
    return schema.properties[resourceType].description;
  }
}
