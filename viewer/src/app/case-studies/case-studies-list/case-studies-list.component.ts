import { Component, OnDestroy, OnInit } from '@angular/core';
import { CaseStudiesService } from '../case-studies.service';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { Subscription } from 'rxjs';
import { CaseStudy } from '../types';
import { CaseStudiesListEmbeddedComponent } from '../case-studies-list-embedded/case-studies-list-embedded.component';

@Component({
  selector: 'app-case-studies-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatChipsModule,
    RouterModule,
    MatListModule,
    MatButtonModule,
    FlexLayoutModule,
    CaseStudiesListEmbeddedComponent,
  ],
  templateUrl: './case-studies-list.component.html',
  styleUrl: './case-studies-list.component.scss',
})
export class CaseStudiesListComponent implements OnInit, OnDestroy {
  subscribe() {
    alert('not implemented yet');
  }
  routerSub?: Subscription;

  caseStudies: CaseStudy[] = [];
  filter?: string;

  constructor(
    public caseStudiesService: CaseStudiesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.routerSub = this.route.queryParams.subscribe((params) => {
      this.filter = params['tag'];
      this.caseStudies = this.caseStudiesService.getCaseStudies();
      if (this.filter) {
        this.caseStudies = this.caseStudies.filter((caseStudy) =>
          caseStudy.hashTags?.includes(this.filter as string)
        );
      }
    });
    this.caseStudies = this.caseStudiesService.getCaseStudies();
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
  }

  filterByTag(tag: string) {
    if (this.filter === tag) {
      this.router.navigate([]);
      return;
    }
    this.router.navigate([], { queryParams: { tag } });
  }
}
