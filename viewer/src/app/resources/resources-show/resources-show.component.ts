import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AppService } from '../../credential-profiles/app.service';
import { Resources } from '../../credential-profiles/resources';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { FlexLayoutServerModule } from '@ngbracket/ngx-layout/server';

@Component({
    selector: 'app-resources-show',
    imports: [
        CommonModule,
        MatIconModule,
        RouterModule,
        MatListModule,
        MatCardModule,
        MatButtonModule,
        FlexLayoutModule,
        FlexLayoutServerModule,
    ],
    templateUrl: './resources-show.component.html',
    styleUrl: './resources-show.component.scss'
})
export class ResourcesShowComponent implements OnInit {
  values: { type: string; key: string; value: string }[] = [];
  resource!: string;
  res?: Record<string, string | { Value: string; Description: string }>;
  constructor(
    private route: ActivatedRoute,
    private snachBar: MatSnackBar,
    private router: Router,
    public appService: AppService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.resource = this.route.snapshot.paramMap.get('resource') as string;
    this.res = this.appService.getValues(this.resource as keyof Resources)?.[
      id
    ];
    if (!this.res) {
      this.router.navigate(['/']);
      this.snachBar.open(`Resource ${id} not found`, 'Close');
    }
    this.values = Object.keys(this.res)
      .filter((key) => key !== '$schema')
      .map((key) => {
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
