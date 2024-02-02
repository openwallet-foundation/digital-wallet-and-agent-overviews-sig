import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Wallet } from './types';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { InfoComponent } from './info/info.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    HttpClientModule,
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatSortModule,
    FlexLayoutModule,
    MatDialogModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
/**
 * The main component of the application
 */
export class AppComponent implements OnInit, AfterViewInit {
  //reference to the MatTableDataSource
  dataSource = new MatTableDataSource<Wallet>();
  // columns that should be displayed in the table
  columns: string[] = ['wallet', 'company', 'openSource', 'linkToApp'];

  //reference to the paginator to be added to the table
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  //reference to the sort to be added to the table
  @ViewChild(MatSort) sort!: MatSort;

  //columns to be displayed in the table, not implemeneted yet
  displayedColumns: string[] = [];

  constructor(private httpClient: HttpClient, private dialog: MatDialog) {}

  /**
   * Fetches the wallets from the json file and sets the dataSource to the wallets
   */
  async ngOnInit(): Promise<void> {
    const wallets = await firstValueFrom(
      this.httpClient.get<Wallet[]>('assets/wallets.json')
    );
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

  showInfo() {
    this.dialog.open(InfoComponent);
  }
}
