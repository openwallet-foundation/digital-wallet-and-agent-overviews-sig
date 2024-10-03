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
import { GithubRepo } from '../github-response';
import { MarkdownModule } from 'ngx-markdown';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { MatTabsModule } from '@angular/material/tabs';
import { Wallet } from '../../wallets/types';

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
    MarkdownModule,
    MatTabsModule,
    FlexLayoutModule,
  ],
  templateUrl: './dependencies-show.component.html',
  styleUrl: './dependencies-show.component.scss',
})
export class DependenciesShowComponent {
  dependency?: Dependency;
  github?: GithubRepo;
  readme?: string;
  wallets: Wallet[] = [];

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
    this.wallets = this.dependenciesService.getWallets(dependency!.id);
    if (this.dependency?.url.startsWith('https://github.com')) {
      this.dependenciesService
        .fetchGitHubRepoInfo(this.dependency.url)
        .then((repo) => (this.github = repo))
        .then(() =>
          this.dependenciesService
            .fetchReadme(this.github as GithubRepo)
            .then((readme) => (this.readme = readme))
        );
    }
  }

  /**
   * Share the wallet
   * @returns
   */
  share() {
    if (!navigator.share) {
      this.snackBar.open('Your browser does not support sharing');
      return;
    }
    navigator.share({
      title: this.dependency?.name,
      text: this.dependency?.name,
      url: window.location.href,
    });
  }
}
