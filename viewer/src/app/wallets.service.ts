import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Wallet } from './types';

export type ResourceType = 'profile' | 'format';

@Injectable({
  providedIn: 'root',
})
export class WalletsService {
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
      case 'profile':
        return `${url}/profiles/${key}`;
      case 'format':
        return `${url}/resources/Credential%20Format/${key}`;
    }
  }
}
