import { Component, OnInit } from '@angular/core';
import { WalletsService } from '../wallets.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Wallet } from '../types';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';

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
  ],
  providers: [WalletsService],
  templateUrl: './wallets-show.component.html',
  styleUrl: './wallets-show.component.scss',
})
export class WalletsShowComponent implements OnInit {
  wallet?: Wallet;
  logoError = false;
  constructor(
    public walletsService: WalletsService,
    private route: ActivatedRoute,
    private router: Router,
    private snachBar: MatSnackBar
  ) {}

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.wallet = await this.walletsService.find(id);
    if (!this.wallet) {
      this.router.navigate(['/']);
      this.snachBar.open(`Wallet ${id} not found`, 'Close');
    }
  }

  getSupport(value?: string) {
    if (!value) return;
    if (value.includes('@')) return `mailto:${value}`;
    return value;
  }
}
