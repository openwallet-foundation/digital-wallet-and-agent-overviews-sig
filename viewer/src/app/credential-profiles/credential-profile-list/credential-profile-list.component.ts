import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AppService, Resource } from '../app.service';
import { Format, Resources } from '../resources';
import { Filter, FilterComponent } from '../filter/filter.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormatPipe } from '../format.pipe';
import { MatChipsModule } from '@angular/material/chips';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { FlexLayoutServerModule } from '@ngbracket/ngx-layout/server';

class ColumnHeader {
  key!: string;
  tooltip!: string;
}

@Component({
    selector: 'app-credential-profile-list',
    imports: [
        CommonModule,
        MatPaginatorModule,
        MatIconModule,
        FormatPipe,
        MatChipsModule,
        MatTableModule,
        RouterModule,
        MatTooltipModule,
        MatButtonModule,
        FlexLayoutModule,
        FlexLayoutServerModule,
    ],
    templateUrl: './credential-profile-list.component.html',
    styleUrls: ['./credential-profile-list.component.scss']
})
export class CredentialProfileListComponent implements OnInit, AfterViewInit {
  data!: Format;
  allColumns: ColumnHeader[] = [];
  displayedColumns: string[] = [];
  columns: ColumnHeader[] = [];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatSort) sort!: MatSort;
  selectionColumns: {
    key: string;
    elements: { value: string; show: string }[];
  }[] = [];

  filter: Filter = {};

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dialog: MatDialog, public appService: AppService) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<any>();
    this.data = this.appService.getFormat('Credential Profile');
    this.allColumns = [];

    Object.keys(this.data.structure.properties).forEach((value: string) => {
      if (value === '$schema') return;
      this.allColumns.push({
        key: value,
        tooltip: this.appService.getTooltip(
          this.data.structure.properties[value]
        ),
      });
    });
    for (const key of this.appService.extraValues) {
      const elements: { value: string; show: string }[] = [];

      const subValues = this.appService.getFormat(this.appService.getKey(key))
        .structure.properties;
      Object.keys(subValues)
        .filter((value) => value !== '$schema')
        .forEach((value: string) => {
          this.allColumns.push({
            key: `${key} - ${value}`,
            tooltip: this.appService.getTooltip(subValues[value]),
          });
          elements.push({
            value: `${key} - ${value}`,
            show: value,
          });
        });
      this.selectionColumns.push({
        key,
        elements,
      });
    }

    this.displayedColumns = this.allColumns.map((value) => value.key);
    this.columns = this.allColumns;

    this.addData();
  }

  private addData() {
    this.dataSource.data = Object.values(this.data.values)
      .map((value) => {
        Object.keys(value)
          .filter((value) =>
            this.appService.extraValues.includes(value as Resource)
          )
          .forEach((key) => {
            const subValues = this.appService.getValues(
              this.appService.getKey(key)
            )[value[key]];
            if (subValues) {
              Object.keys(subValues)
                .filter((subKey) => subKey !== '$schema')
                .forEach((subKey) => {
                  value[`${key} - ${subKey}`] = subValues[subKey];
                });
            }
          });
        return value;
      })
      // filter out the columns that do not match with the filter
      .filter((value) => {
        if (Object.keys(this.filter).length === 0) return true;
        for (const category in this.filter) {
          for (const key in this.filter[category]) {
            if (this.filter[category][key]) {
              const res = value[`${category} - ${key}`];
              if (typeof res === 'object' && res.Value === false) {
                console.log(value);
              }
              if (
                typeof res === 'object'
                  ? !res.Value
                  : res === false || typeof res === 'undefined'
              ) {
                return false;
              }
            }
          }
        }
        return true;
      });
  }

  getFilterValues() {
    const elements = [];
    for (const category in this.filter) {
      for (const key in this.filter[category]) {
        if (this.filter[category][key]) {
          elements.push(`${category} - ${key}`);
        }
      }
    }
    return elements;
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  isSticky(column: ColumnHeader) {
    return column.key === 'Name';
  }

  hasLink(value: string, header: string) {
    if (!value || typeof value !== 'string') return;
    if (header.startsWith('Key Management')) header = 'Key Management';
    return this.appService.getFormat(header as keyof Resources)?.values[value];
  }

  getLink(values: string[]) {
    return values.map((value) => this.appService.getKey(value));
  }

  openFilter() {
    this.dialog
      .open(FilterComponent, {
        disableClose: true,
        minWidth: '500px',
        data: this.filter,
      })
      .afterClosed()
      .subscribe((value) => {
        if (!value) return;
        this.filter = value;
        this.addData();
      });
  }

  elementType(value: any, header: string) {
    if (typeof value === 'undefined') return 'undefined';
    if (typeof value === 'boolean') return 'icon';
    if (typeof value.Value !== 'undefined') return 'icon-tooltip';
    return this.hasLink(value, header) ? 'link' : 'text';
  }
}
