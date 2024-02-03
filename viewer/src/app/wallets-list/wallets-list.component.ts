import { HttpClientModule } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { Wallet } from '../types';
import { WalletsService } from '../wallets.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-wallets-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatSortModule,
    FlexLayoutModule,
    MatDialogModule,
    MatChipsModule,
  ],
  providers: [WalletsService],
  templateUrl: './wallets-list.component.html',
  styleUrl: './wallets-list.component.scss',
})
export class WalletsListComponent implements OnInit, AfterViewInit {
  //reference to the MatTableDataSource
  dataSource = new MatTableDataSource<Wallet>();
  // columns that should be displayed in the table
  columns: string[] = [
    'wallet',
    'company',
    'type',
    'openSource',
    'license',
    'capability',
    'portability',
    'linkToApp',
    'profiles',
  ];

  //reference to the paginator to be added to the table
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  //reference to the sort to be added to the table
  @ViewChild(MatSort) sort!: MatSort;

  //columns to be displayed in the table, not implemeneted yet
  displayedColumns: string[] = [];

  constructor(private walletsService: WalletsService) {}

  /**
   * Fetches the wallets from the json file and sets the dataSource to the wallets
   */
  async ngOnInit(): Promise<void> {
    const wallets = await this.walletsService.loadWallets();
    this.dataSource.data = wallets;
    this.displayedColumns = this.columns;
  }

  /**
   * After the view has been initialized, set the sort and paginator to the dataSource
   */
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
