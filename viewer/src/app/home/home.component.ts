import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { FlexLayoutServerModule } from '@ngbracket/ngx-layout/server';
import { AppService } from '../credential-profiles/app.service';
import { MatListModule } from '@angular/material/list';

@Component({
    selector: 'app-home',
    imports: [
        FlexLayoutModule,
        FlexLayoutServerModule,
        MatButtonModule,
        CommonModule,
        RouterModule,
        MatDividerModule,
        MatCardModule,
        MatRippleModule,
        MatListModule,
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  leftTabs: string[] = [];
  rightTabs: string[] = [];

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    const tabs = Object.keys(this.appService.getElements()).filter(
      (key) => key !== 'Credential Profile' && key !== 'defs'
    );
    const midIndex = Math.ceil(tabs.length / 2);
    this.leftTabs = tabs.slice(0, midIndex);
    this.rightTabs = tabs.slice(midIndex);
  }
}
