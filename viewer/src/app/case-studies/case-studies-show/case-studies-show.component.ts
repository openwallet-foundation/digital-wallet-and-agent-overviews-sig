import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CaseStudiesService } from '../case-studies.service';
import { CaseStudy } from '../types';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { WalletsService } from '../../wallets/wallets.service';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FlexLayoutServerModule } from '@ngbracket/ngx-layout/server';

@Component({
    selector: 'app-case-studies-show',
    imports: [
        MatCardModule,
        CommonModule,
        FlexLayoutModule,
        FlexLayoutServerModule,
        MatDividerModule,
        MatChipsModule,
        RouterModule,
        MatListModule,
        MatButtonModule,
        MatIconModule,
        MatSnackBarModule,
    ],
    templateUrl: './case-studies-show.component.html',
    styleUrl: './case-studies-show.component.scss'
})
export class CaseStudiesShowComponent implements OnInit {
  caseStudy?: CaseStudy;

  constructor(
    private route: ActivatedRoute,
    private caseStudyiesService: CaseStudiesService,
    public walletsService: WalletsService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'] as string;
    this.caseStudy = this.caseStudyiesService.getCaseStudy(id);
  }

  share() {
    if (!navigator.share) {
      this.snackBar.open('Your browser does not support sharing');
      return;
    }
    navigator.share({
      title: this.caseStudy?.headline,
      url: window.location.href,
    });
  }
}
