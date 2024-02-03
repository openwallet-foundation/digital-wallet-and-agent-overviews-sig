import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Wallet } from './types';

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
}
