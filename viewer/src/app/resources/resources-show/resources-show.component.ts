import { Component, OnInit, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AppService } from '../../credential-profiles/app.service';
import { Resources } from '../../credential-profiles/resources';

import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { FlexLayoutServerModule } from '@ngbracket/ngx-layout/server';

@Component({
  selector: 'app-resources-show',
  imports: [
    MatIconModule,
    RouterModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule,
    FlexLayoutServerModule,
  ],
  templateUrl: './resources-show.component.html',
  styleUrl: './resources-show.component.scss',
})
export class ResourcesShowComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private snachBar = inject(MatSnackBar);
  private router = inject(Router);
  appService = inject(AppService);

  values: { type: string; key: string; value: string }[] = [];
  resource!: string;
  res?: Record<string, string | { Value: string; Description: string }>;

  private encodeForRouter(value: string): string {
    // encodeURIComponent doesn't encode () but Angular router treats them as auxiliary route syntax
    return encodeURIComponent(value).replace(/\(/g, '%28').replace(/\)/g, '%29');
  }

  getDefinitionLink(resource: string, key: string): string {
    return `/definitions/${this.encodeForRouter(resource)}/${this.encodeForRouter(key)}`;
  }

  ngOnInit(): void {
    const id = decodeURIComponent(this.route.snapshot.paramMap.get('id') as string);
    console.log(id);
    this.resource = decodeURIComponent(this.route.snapshot.paramMap.get('resource') as string);
    this.res = this.appService.getValues(this.resource as keyof Resources)?.[id];
    if (!this.res) {
      this.router.navigate(['/']);
      this.snachBar.open(`Resource ${id} not found`, 'Close');
    }
    this.values = Object.keys(this.res)
      .filter(key => key !== '$schema')
      .map(key => {
        let value = this.res![key];
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
          key,
          value,
        };
      });
  }
}
