import { Injectable } from '@angular/core';
import { CaseStudy } from './types';
import { Wallet } from '../wallets/types';
import { casestudyData } from './case-studies-data';
import { walletData } from '../wallets/wallets-data';
import schema from '../../assets/case-study.schema.json';

@Injectable({
  providedIn: 'root',
})
export class CaseStudiesService {
  find(id: string) {
    return casestudyData.find((caseStudy) => caseStudy.id === id);
  }

  /**
   * Returns the tooltip for the resource
   * @param resourceType
   * @returns
   */
  getTooltip(resourceType: keyof typeof schema.properties) {
    return schema.properties[resourceType].description;
  }

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

  getCaseStudy(id: string) {
    return this.getCaseStudies().find((caseStudy) => caseStudy.id === id);
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
