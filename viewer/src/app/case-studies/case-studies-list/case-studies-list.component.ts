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
import { MatDialog } from '@angular/material/dialog';
import { CaseStudiesAddComponent } from '../case-studies-add/case-studies-add.component';
import { FlexLayoutServerModule } from '@ngbracket/ngx-layout/server';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-case-studies-list',
    imports: [
        CommonModule,
        MatCardModule,
        MatDividerModule,
        MatChipsModule,
        RouterModule,
        MatListModule,
        MatButtonModule,
        FlexLayoutModule,
        FlexLayoutServerModule,
        CaseStudiesListEmbeddedComponent,
    ],
    templateUrl: './case-studies-list.component.html',
    styleUrl: './case-studies-list.component.scss'
})
export class CaseStudiesListComponent implements OnInit, OnDestroy {
  subscribeLink = 'https://sgzwn.mjt.lu/wgt/sgzwn/xvm0/form?c=29dfe052';

  routerSub?: Subscription;

  caseStudies: CaseStudy[] = [];
  filter?: string;

  constructor(
    public caseStudiesService: CaseStudiesService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.filter = this.route.snapshot.queryParams['tag'];
    this.routerSub = this.route.queryParams.subscribe((params) => {
      this.filter = params['tag'];
      this.caseStudies = this.caseStudiesService.getCaseStudies();
      if (this.filter) {
        this.caseStudies = this.caseStudies.filter((caseStudy) =>
          caseStudy.hashTags?.includes(this.filter as string)
        );
        this.applyFilter();
        if (this.caseStudies.length === 0) {
          const found = this.caseStudiesService
            .getTags()
            .find((tag) => tag === this.filter);
          if (!found) {
            this.snackbar
              .open(
                `No case studies found for tag: ${this.filter}`,
                'Reset filter'
              )
              .afterDismissed()
              .subscribe(() => this.router.navigate([]));
          }
        }
      }
    });
    this.route.fragment.subscribe((fragment) => {
      if (fragment === 'add') {
        this.addCaseStudy();
      }
    });
    this.caseStudies = this.caseStudiesService.getCaseStudies();
    this.applyFilter();
  }

  /**
   * Validates if the value is euqal to the set filter.
   * @param tag
   * @returns
   */
  isSelected(tag: string): unknown {
    return tag === this.filter;
  }

  /**
   * Applies the filter that is set. Right it can only be filtered for one element.
   */
  private applyFilter() {
    if (this.filter) {
      this.caseStudies = this.caseStudies.filter((caseStudy) =>
        caseStudy.hashTags?.includes(this.filter as string)
      );
    }
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

  addCaseStudy() {
    this.dialog.open<CaseStudiesAddComponent>(CaseStudiesAddComponent, {
      disableClose: true,
      width: '800px',
    });
  }
}
