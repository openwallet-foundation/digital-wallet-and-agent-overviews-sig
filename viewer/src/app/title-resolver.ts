import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { WalletsService } from './wallets/wallets.service';
import { CaseStudiesService } from './case-studies/case-studies.service';
import { DependenciesService } from './dependencies/dependencies.service';

@Injectable({
  providedIn: 'root',
})
export class TitleResolver implements Resolve<string> {
  constructor(
    private walletsService: WalletsService,
    private caseStudiesService: CaseStudiesService,
    private dependenciesService: DependenciesService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<string> {
    const id = route.paramMap.get('id');
    const path = route.parent?.routeConfig?.path;

    if (path?.startsWith('wallets')) {
      const wallet = this.walletsService.find(id!);
      return of(wallet ? `Wallet: ${wallet.name}` : 'Wallet Not Found');
    } else if (path?.startsWith('case-studies')) {
      const caseStudy = this.caseStudiesService.find(id!);
      return of(
        caseStudy ? `Case Study: ${caseStudy.headline}` : 'Case Study Not Found'
      );
    } else if (path?.startsWith('dependencies')) {
      const dependency = this.dependenciesService.find(id!);
      return of(
        dependency ? `Dependency: ${dependency.name}` : 'Dependency Not Found'
      );
    }

    return of('Not Found');
  }
}
