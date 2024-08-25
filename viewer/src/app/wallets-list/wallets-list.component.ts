import {} from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { Wallet } from '../types';
import { WalletsService } from '../wallets.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import {
  WalletFilter,
  WalletsListFilterComponent,
} from '../wallets-list-filter/wallets-list-filter.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

type Colums =
  | 'name'
  | 'company'
  | 'type'
  | 'openSource'
  | 'license'
  | 'capability'
  | 'portability'
  | 'linkToApp';

@Component({
  selector: 'app-wallets-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
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
    'name',
    'company',
    'type',
    'openSource',
    'license',
    'capability',
    'portability',
    'linkToApp',
  ];

  //reference to the paginator to be added to the table
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  //reference to the sort to be added to the table
  @ViewChild(MatSort) sort!: MatSort;

  //columns to be displayed in the table, not implemeneted yet
  displayedColumns: string[] = [];
  filter?: WalletFilter;
  mobile = false;

  constructor(
    public walletsService: WalletsService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) {
    this.breakpointObserver
      .observe([Breakpoints.XSmall])
      .subscribe((res) => (this.mobile = res.matches));
  }

  /**
   * Fetches the wallets from the json file and sets the dataSource to the wallets
   */
  async ngOnInit(): Promise<void> {
    //subscribe to the fragment of the route, if it changes, update the filter and load the wallets
    this.route.fragment.subscribe(async (fragment) => {
      this.filter = JSON.parse(fragment ?? '{}');
      this.loadWallets();
    });
    this.walletsService.resources.forEach((res) => this.columns.push(res.id));
    this.displayedColumns = this.columns;
  }

  /**
   * After the view has been initialized, set the sort and paginator to the dataSource
   */
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property as Colums) {
        case 'license':
        case 'type':
        case 'company':
          return (item[property as keyof Wallet] as string) || '\ufff0';
        case 'capability':
          return (
            (item[property as keyof Wallet] as string[])?.join(', ') || '\ufff0'
          );
        case 'linkToApp':
          return item.urlGooglePlayStore || item.urlAppStore || '\ufff0';
        case 'openSource':
          // since the 0 string is smaller, it will be placed at the beginning
          return item.openSource ? '0' : '1';
        default:
          return (item[property as keyof Wallet] as string) || '\ufff0';
      }
    };
    this.dataSource.sortData = (data, sort: MatSort) => {
      const isAsc = sort.direction === 'asc';
      return data.sort((a, b) => {
        let valueA = this.dataSource.sortingDataAccessor(a, sort.active);
        let valueB = this.dataSource.sortingDataAccessor(b, sort.active);

        // Handle Infinity and high Unicode character for consistent end-position sorting
        let emptyA = valueA === Infinity || valueA === '\ufff0';
        let emptyB = valueB === Infinity || valueB === '\ufff0';
        if (emptyA && !emptyB) {
          return 1; // Always place emptyA at the end
        } else if (!emptyA && emptyB) {
          return -1; // Always place emptyB at the end
        } else {
          // If both are non-empty, compare normally
          if (typeof valueA === 'string' && typeof valueB === 'string') {
            return (
              valueA.toLowerCase().localeCompare(valueB.toLowerCase()) *
              (isAsc ? 1 : -1)
            );
          } else {
            return (valueA < valueB ? -1 : 1) * (isAsc ? 1 : -1);
          }
        }
      });
    };
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Filters the wallets based on the filter object
   */
  openFilter() {
    this.dialog
      .open<WalletsListFilterComponent, WalletFilter>(
        WalletsListFilterComponent,
        { data: this.filter }
      )
      .afterClosed()
      .subscribe(async (res: WalletFilter) => {
        this.router.navigate([], {
          relativeTo: this.route,
          fragment: JSON.stringify(res),
          replaceUrl: false,
        });
        this.filter = res;
        this.loadWallets();
      });
  }

  /**
   * Load the filtered wallets
   */
  private async loadWallets() {
    let values = await this.walletsService.loadWallets();
    if (this.filter) {
      if (this.filter.type) {
        values = values.filter((wallet) => wallet.type === this.filter!.type);
      }
      if (this.filter.openSource) {
        values = values.filter(
          (wallet) => wallet.openSource === (this.filter!.openSource === 'true')
        );
      }
      if (this.filter.capability && this.filter.capability.length > 0) {
        values = values.filter(
          (wallet) =>
            wallet.capability &&
            this.filter!.capability?.every((cap) =>
              wallet.capability?.includes(cap)
            )
        );
      }
      if (this.filter.portability) {
        values = values.filter(
          (wallet) =>
            wallet.portability === (this.filter!.portability === 'true')
        );
      }

      const resources = this.walletsService.resources.map((res) => res.id);
      resources.forEach((resource) => {
        if (this.filter![resource]) {
          values = values.filter((wallet) =>
            this.filter![resource]?.every((res) =>
              wallet[resource]?.includes(res)
            )
          );
        }
      });
    }
    this.dataSource.data = values;
  }

  /**
   * Returns a list of all active filters
   * @returns
   */
  getFilterValues() {
    if (!this.filter) return [];
    const filtered: string[] = [];
    Object.keys(this.filter).forEach((key) => {
      const k = key as keyof WalletFilter;
      if (this.filter && this.filter[k]) {
        if (typeof this.filter[k] === 'string') {
          filtered.push(`${key}: ${this.filter[k] as string}`);
        } else if (
          this.filter[k] instanceof Array &&
          (this.filter[k] as Array<string>).length > 0
        ) {
          filtered.push(
            `${key}: ${(this.filter[k] as Array<string>).join(', ')}`
          );
        }
      }
    });
    return filtered;
  }
}
