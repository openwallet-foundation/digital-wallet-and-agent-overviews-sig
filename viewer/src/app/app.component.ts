import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog } from '@angular/material/dialog';
import { InfoComponent } from './info/info.component';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { FlexLayoutServerModule } from '@ngbracket/ngx-layout/server';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { Title, Meta } from '@angular/platform-browser';
import { filter, switchMap, map } from 'rxjs';
import { SeoInformation } from './seo-resolver';
import { AppService } from './credential-profiles/app.service';

@Component({
    selector: 'app-root',
    imports: [
        RouterModule,
        CommonModule,
        MatToolbarModule,
        MatButtonModule,
        FlexLayoutModule,
        FlexLayoutServerModule,
        MatMenuModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
/**
 * The main component of the application
 */
export class AppComponent implements OnInit {
  tabs: string[] = [];

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private appService: AppService
  ) {}

  showInfo() {
    this.dialog.open(InfoComponent);
  }

  ngOnInit() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        switchMap(() => {
          let route = this.activatedRoute;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route.data;
        }),
        map((data) => (data['seo'] as SeoInformation) ?? data)
      )
      .subscribe((information) => {
        if (information) {
          this.titleService.setTitle(information.title);
          if (information.description) {
            this.metaService.updateTag({
              name: 'description',
              content: information.description,
            });
            this.metaService.updateTag({
              property: 'og:description',
              content: `${information.description}`,
            });
          } else {
            this.metaService.removeTag('name="description"');
            this.metaService.removeTag('property="og:description"');
          }
          this.metaService.updateTag({
            property: 'og:title',
            content: information.title,
          });
          if (information.image) {
            this.metaService.updateTag({
              property: 'og:image',
              content: information.image.startsWith('logos')
                ? `https://openwallet-foundation.github.io/digital-wallet-and-agent-overviews-sig/assets/${information.image}`
                : information.image,
            });
          } else {
            this.metaService.removeTag('property="og:image"');
          }
          this.metaService.updateTag({
            property: 'og:url',
            content: this.router.url,
          });
        }
      });
    this.appService.getElements();
    this.tabs = Object.keys(this.appService.getElements()).filter(
      (key) => key !== 'Credential Profile' && key !== 'defs'
    );
  }
}
