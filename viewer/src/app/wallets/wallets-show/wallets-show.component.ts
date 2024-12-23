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
import { DependencyListEmbeddedComponent } from '../../dependencies/dependencies-list-embedded/dependencies-list-embedded.component';
import { FlexLayoutServerModule } from '@ngbracket/ngx-layout/server';

@Component({
    selector: 'app-wallets-show',
    imports: [
        CommonModule,
        RouterModule,
        MatSnackBarModule,
        MatButtonModule,
        FlexLayoutModule,
        FlexLayoutServerModule,
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
    styleUrl: './wallets-show.component.scss'
})
export class WalletsShowComponent implements OnInit, OnDestroy {
  wallet?: Wallet;
  logoError = true;
  private routerSubscription?: Subscription;
  invalid?: string;

  constructor(
    public walletsService: WalletsService,
    private route: ActivatedRoute,
    private router: Router,
    private snachBar: MatSnackBar
  ) {}

  async ngOnInit(): Promise<void> {
    this.walletsService.getErrors();
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
    this.invalid = await this.walletsService.invalidEntry(id);
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

  /**
   * Share the wallet
   * @returns
   */
  share() {
    if (!navigator.share) {
      this.snachBar.open('Your browser does not support sharing');
      return;
    }
    navigator.share({
      title: this.wallet?.name,
      text: `${this.wallet?.name} by ${this.wallet?.company}`,
      url: window.location.href,
    });
  }
}
