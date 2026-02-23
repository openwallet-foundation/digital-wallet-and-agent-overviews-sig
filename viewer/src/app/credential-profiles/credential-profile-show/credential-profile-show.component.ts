import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AppService } from '../app.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IProfile, Resources } from '../resources';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { FlexLayoutServerModule } from '@ngbracket/ngx-layout/server';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-credential-profile-show',
  imports: [
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    RouterModule,
    FlexLayoutModule,
    FlexLayoutServerModule,
    CommonModule,
  ],
  templateUrl: './credential-profile-show.component.html',
  styleUrl: './credential-profile-show.component.scss',
})
export class CredentialProfileShowComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private snachBar = inject(MatSnackBar);
  private router = inject(Router);
  appService = inject(AppService);

  profile?: IProfile;
  private elementsCache = new Map<string, { type: string; key: string; value: string }[]>();

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.profile = this.appService.getProfile(id) as IProfile;
    if (!this.profile) {
      this.router.navigate(['/']);
      this.snachBar.open(`Profile ${id} not found`, 'Close');
    } else {
      // Pre-compute elements for all keys to avoid change detection issues
      for (const key of this.appService.extraValues) {
        this.elementsCache.set(key, this.computeElement(key));
      }
    }
  }

  getElement(key: string) {
    return this.elementsCache.get(key) ?? [];
  }

  private computeElement(key: string) {
    const name = this.profile?.[key as keyof IProfile] as string;
    let lookupKey = key;
    if (key.includes('Key Management')) {
      lookupKey = 'Key Management';
    }
    const values = this.appService.getValues(lookupKey as keyof Resources)[name];
    if (!name) return [];
    if (values) {
      return Object.keys(values)
        .filter(k => k !== '$schema')
        .map(k => {
          let value = values[k];
          let type = 'text';
          if (typeof value === 'string' && value.startsWith('http')) {
            type = 'link';
          } else if (Array.isArray(value)) {
            value = value.join(', ');
          } else if (typeof value === 'object') {
            value = `${value.Value} (${value.Description})`;
          }
          return {
            type,
            key: k,
            value,
          };
        });
    }
    return [];
  }
}
