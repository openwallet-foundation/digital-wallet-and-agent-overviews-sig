import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { dependencyData } from '../dependencies-data';
import { Dependency } from '../types';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DependenciesService } from '../dependencies.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { WalletsListComponent } from '../../wallets/wallets-list/wallets-list.component';

@Component({
  selector: 'app-dependencies-show',
  standalone: true,
  imports: [
    MatSnackBarModule,
    CommonModule,
    RouterModule,
    MatIconModule,
    MatListModule,
    MatTooltipModule,
    MatButtonModule,
    MatChipsModule,
    WalletsListComponent,
  ],
  templateUrl: './dependencies-show.component.html',
  styleUrl: './dependencies-show.component.scss',
})
export class DependenciesShowComponent {
  dependency?: Dependency;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    public dependenciesService: DependenciesService
  ) {
    const id = this.route.snapshot.params['id'] as string;
    const dependency = dependencyData.find((d) => d.id === id);
    if (!dependency) {
      this.router
        .navigate(['../'], { relativeTo: this.route })
        .then(() => this.snackBar.open(`Dependency ${id} not found`, 'Close'));
    } else {
      this.dependency = dependency;
    }
  }
}
