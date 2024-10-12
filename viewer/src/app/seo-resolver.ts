import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { WalletsService } from './wallets/wallets.service';
import { CaseStudiesService } from './case-studies/case-studies.service';
import { DependenciesService } from './dependencies/dependencies.service';

export interface SeoInformation {
  title: string;
  description?: string;
  image?: string;
}

@Injectable({
  providedIn: 'root',
})
export class SeoResolver implements Resolve<SeoInformation> {
  constructor(
    private walletsService: WalletsService,
    private caseStudiesService: CaseStudiesService,
    private dependenciesService: DependenciesService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<SeoInformation> {
    const id = route.paramMap.get('id');
    const path = route.parent?.routeConfig?.path;

    if (path?.startsWith('wallets')) {
      const wallet = this.walletsService.find(id!);
      return of(
        wallet
          ? {
              title: wallet.name,
              description: `An application provided by ${wallet.company}`,
              image: wallet.logo,
            }
          : {
              title: 'Wallet Not Found',
            }
      );
    } else if (path?.startsWith('case-studies')) {
      const caseStudy = this.caseStudiesService.find(id!);
      return of(
        caseStudy
          ? {
              title: caseStudy.headline,
              description:
                caseStudy.summary.length > 200
                  ? `${caseStudy.summary.slice(0, 197)}...`
                  : caseStudy.summary,
              image: caseStudy.imageUrl,
            }
          : { title: 'Case Study Not Found' }
      );
    } else if (path?.startsWith('dependencies')) {
      const dependency = this.dependenciesService.find(id!);
      return of(
        dependency
          ? { title: dependency.name, description: dependency.description }
          : { title: 'Dependency Not Found' }
      );
    }

    return of({ title: 'Not Found' });
  }
}
