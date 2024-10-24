import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { WalletsService } from './wallets/wallets.service';
import { CaseStudiesService } from './case-studies/case-studies.service';
import { DependenciesService } from './dependencies/dependencies.service';
import { AppService } from './credential-profiles/app.service';
import { IProfile, Resources } from './credential-profiles/resources';

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
    private dependenciesService: DependenciesService,
    private appService: AppService
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
    } else if (path?.startsWith('credential-profiles')) {
      const profile: IProfile = this.appService.getProfile(id!);
      return of(
        profile ? { title: profile.Name } : { title: 'Profile Not Found' }
      );
    } else if (path?.startsWith('resources')) {
      const resource = route.paramMap.get('resource') as string;
      if (!id) {
        return of({ title: resource });
      } else {
        const res = this.appService.getValues(resource as keyof Resources)?.[
          id
        ];
        return of(res ? { title: res.Name } : { title: 'Resource Not Found' });
      }
    }

    return of({ title: 'Not Found' });
  }
}
