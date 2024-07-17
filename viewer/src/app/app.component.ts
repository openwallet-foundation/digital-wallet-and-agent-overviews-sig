import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import {} from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { InfoComponent } from './info/info.component';
import { MatButtonModule } from '@angular/material/button';
import { WalletsAddComponent } from './wallets-add/wallets-add.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule, MatToolbarModule, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
/**
 * The main component of the application
 */
export class AppComponent {
  constructor(private dialog: MatDialog) {}

  addWallet() {
    this.dialog.open(WalletsAddComponent, { disableClose: true });
  }
  showInfo() {
    this.dialog.open(InfoComponent);
  }
}
