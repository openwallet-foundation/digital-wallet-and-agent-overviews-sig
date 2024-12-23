import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { DependenciesService } from '../dependencies.service';
import { Dependency } from '../types';
import schema from '../../../assets/schemas/dependency.json';
import {
  DependenciesFilterComponent,
  DependencyFilter,
} from '../dependencies-filter/dependencies-filter.component';
import { DependenciesAddComponent } from '../dependencies-add/dependencies-add.component';
import { FlexLayoutServerModule } from '@ngbracket/ngx-layout/server';

type DependenciesColumn = keyof typeof schema.properties | 'wallets';

@Component({
  selector: 'app-dependency-list-embedded',
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
    FlexLayoutServerModule,
    MatDialogModule,
    MatChipsModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './dependencies-list-embedded.component.html',
  styleUrl: './dependencies-list-embedded.component.scss',
})
export class DependencyListEmbeddedComponent implements OnInit, AfterViewInit {
  @Input() dependencies: Dependency[] = [];

  //reference to the MatTableDataSource
  dataSource = new MatTableDataSource<Dependency>();

  // columns that should be displayed in the table
  columns: DependenciesColumn[] = [
    'name',
    'description',
    'license',
    'language',
    'wallets',
  ];

  //reference to the paginator to be added to the table
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  //reference to the sort to be added to the table
  @ViewChild(MatSort) sort!: MatSort;

  filter?: DependencyFilter;

  constructor(
    public dependenciesService: DependenciesService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadDependencies();
    //subscribe to the fragment of the route, if it changes, update the filter and load the wallets
    this.route.fragment.subscribe(async (fragment) => {
      if (fragment === 'add') {
        this.addDependency();
      } else {
        this.filter = JSON.parse(fragment ?? '{}');
      }
      this.loadDependencies();
    });
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  private loadDependencies() {
    let dependencies = this.dependencies;
    if (this.filter) {
      if (this.filter.language) {
        dependencies = dependencies.filter(
          (dependency) => dependency.language === this.filter?.language
        );
      }
      if (this.filter.license) {
        dependencies = dependencies.filter(
          (dependency) => dependency.license === this.filter?.license
        );
      }
    }
    this.dataSource.data = dependencies;
  }

  /**
   * Filters the wallets based on the filter object
   */
  openFilter() {
    this.dialog
      .open<DependenciesFilterComponent, DependencyFilter>(
        DependenciesFilterComponent,
        { data: this.filter, disableClose: true }
      )
      .afterClosed()
      .subscribe(async (res: DependencyFilter) => {
        this.router.navigate([], {
          relativeTo: this.route,
          fragment: JSON.stringify(res),
          replaceUrl: false,
        });
        this.filter = res;
        this.loadDependencies();
      });
  }

  /**
   * Returns a list of all active filters
   * @returns
   */
  getFilterValues() {
    if (!this.filter) return [];
    const filtered: string[] = [];
    Object.keys(this.filter).forEach((key) => {
      const k = key as keyof DependencyFilter;
      if (this.filter?.[k]) {
        if (typeof this.filter[k] === 'string') {
          filtered.push(`${key}: ${this.filter[k] as string}`);
        }
        /* else if (
          this.filter[k] instanceof Array &&
          (this.filter[k] as string[]).length > 0
        )  */
        /* {
          filtered.push(`${key}: ${(this.filter[k] as string[]).join(', ')}`);
        } */
      }
    });
    return filtered;
  }

  addDependency() {
    this.dialog.open<DependenciesAddComponent>(DependenciesAddComponent, {
      disableClose: true,
    });
  }
}
