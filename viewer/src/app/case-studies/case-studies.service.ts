import { Injectable } from '@angular/core';
import { CaseStudy } from './types';
import { Wallet } from '../wallets/types';
import { casestudyData } from './case-studies-data';
import { walletData } from '../wallets/wallets-data';

@Injectable({
  providedIn: 'root',
})
export class CaseStudiesService {
  getByWallet(wallet: Wallet) {
    return casestudyData.filter((caseStudy: CaseStudy) =>
      caseStudy.references?.includes(wallet.name)
    );
  }

  getWallets(caseStudy: CaseStudy) {
    return (caseStudy.references as string[]).map(
      (name) => walletData.find((wallet) => wallet.name === name) as Wallet
    );
  }

  getCaseStudies() {
    return casestudyData;
  }

  /**
   * Returns all tags of the case studies, sorted by their frequency
   */
  getTags() {
    const tags: Record<string, number> = {};
    casestudyData.forEach((caseStudy) => {
      caseStudy.hashTags?.forEach((tag) => {
        if (tags[tag]) {
          tags[tag]++;
        } else {
          tags[tag] = 1;
        }
      });
    });
    return Object.keys(tags).sort((a, b) => tags[b] - tags[a]);
  }
}
