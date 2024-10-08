import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { FlexLayoutServerModule } from '@ngbracket/ngx-layout/server';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FlexLayoutModule,
    FlexLayoutServerModule,
    MatButtonModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
