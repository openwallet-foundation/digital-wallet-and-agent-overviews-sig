import { Component, OnInit } from '@angular/core';
import { WalletsService } from '../wallets.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Wallet } from '../types';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-wallets-show',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSnackBarModule,
    MatButtonModule,
    HttpClientModule,
    FlexLayoutModule,
    MatIconModule,
    MatListModule,
  ],
  providers: [WalletsService],
  templateUrl: './wallets-show.component.html',
  styleUrl: './wallets-show.component.scss',
})
export class WalletsShowComponent implements OnInit {
  //dummy entries
  supportedCredentialProfiles = ['HAIP', 'ISO mDL'];

  supportedCredentialFormats = ['MDOC'];

  wallet?: Wallet;
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
