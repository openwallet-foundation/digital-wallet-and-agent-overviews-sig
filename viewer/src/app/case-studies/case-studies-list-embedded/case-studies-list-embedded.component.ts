import { Component, Input } from '@angular/core';
import { CaseStudy } from '../types';
import { CaseStudiesService } from '../case-studies.service';
import { MatChipsModule } from '@angular/material/chips';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutServerModule } from '@ngbracket/ngx-layout/server';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-case-studies-list-embedded',
    imports: [
        MatChipsModule,
        RouterModule,
        CommonModule,
        MatDividerModule,
        FlexLayoutModule,
        FlexLayoutServerModule,
        MatButtonModule,
        MatCardModule,
    ],
    templateUrl: './case-studies-list-embedded.component.html',
    styleUrl: './case-studies-list-embedded.component.scss'
})
export class CaseStudiesListEmbeddedComponent {
  @Input() caseStudies: CaseStudy[] = [];

  constructor(public caseStudiesService: CaseStudiesService) {
    this.caseStudies = this.caseStudies.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  /**
   * Returns the list of companies that have built the wallet or agent involved in the use case.
   * @param caseStudy
   */
  getCompanies(caseStudy: CaseStudy) {
    return this.caseStudiesService
      .getWallets(caseStudy)
      .map((wallet) => wallet.company)
      .join(', ');
  }
}
