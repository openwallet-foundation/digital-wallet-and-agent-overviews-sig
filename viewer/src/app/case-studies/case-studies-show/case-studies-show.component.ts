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

@Component({
  selector: 'app-case-studies-show',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    FlexLayoutModule,
    MatDividerModule,
    MatChipsModule,
    RouterModule,
    MatListModule,
    MatButtonModule,
  ],
  templateUrl: './case-studies-show.component.html',
  styleUrl: './case-studies-show.component.scss',
})
export class CaseStudiesShowComponent implements OnInit {
  caseStudy?: CaseStudy;

  constructor(
    private route: ActivatedRoute,
    private caseStudyiesService: CaseStudiesService,
    public walletsService: WalletsService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'] as string;
    this.caseStudy = this.caseStudyiesService.getCaseStudy(id);
  }
}
