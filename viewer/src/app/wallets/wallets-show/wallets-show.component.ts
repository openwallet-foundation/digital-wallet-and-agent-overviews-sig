import { Component, OnDestroy, OnInit } from '@angular/core';
import { WalletsService } from '../wallets.service';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';
import { Wallet } from '../types';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { filter, Subscription } from 'rxjs';
import { CaseStudiesListEmbeddedComponent } from '../../case-studies/case-studies-list-embedded/case-studies-list-embedded.component';
import { DependencyListEmbeddedComponent } from '../../dependencies/dependency-list-embedded/dependency-list-embedded.component';

@Component({
  selector: 'app-wallets-show',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSnackBarModule,
    MatButtonModule,
    FlexLayoutModule,
    MatIconModule,
    MatListModule,
    MatTooltipModule,
    MatChipsModule,
    MatCardModule,
    CaseStudiesListEmbeddedComponent,
    DependencyListEmbeddedComponent,
  ],
  providers: [WalletsService],
  templateUrl: './wallets-show.component.html',
  styleUrl: './wallets-show.component.scss',
})
export class WalletsShowComponent implements OnInit, OnDestroy {
  wallet?: Wallet;
  logoError = true;
  private routerSubscription?: Subscription;

  constructor(
    public walletsService: WalletsService,
    private route: ActivatedRoute,
    private router: Router,
    private snachBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.loadWallet();
      });
    this.loadWallet();
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  private async loadWallet() {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.wallet = await this.walletsService.find(id);
    if (!this.wallet) {
      this.router
        .navigate(['/'])
        .then(() => this.snachBar.open(`${id} not found`));
    }
  }

  getSupport(value?: string) {
    if (!value) return;
    if (value.includes('@')) return `mailto:${value}`;
    return value;
  }

  /**
   * Get all references execpt the own one from the list.
   * @param references
   * @returns
   */
  filterReferences(references: string[]) {
    return references.filter(
      (reference) => reference !== (this.wallet as Wallet).name
    );
  }
}
