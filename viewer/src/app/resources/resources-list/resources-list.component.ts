import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { AppService } from '../../credential-profiles/app.service';
import { Format, Resources } from '../../credential-profiles/resources';
import { CommonModule } from '@angular/common';
import { FormatPipe } from '../../credential-profiles/format.pipe';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

export interface ColumnHeader {
  header: string;
  tooltip: string;
}

type Res = keyof Resources;

@Component({
    selector: 'app-resources-list',
    imports: [
        CommonModule,
        MatTableModule,
        MatPaginatorModule,
        FormatPipe,
        MatIconModule,
        MatTooltipModule,
        RouterModule,
    ],
    templateUrl: './resources-list.component.html',
    styleUrls: ['./resources-list.component.scss']
})
export class ResourcesListComponent implements OnInit, AfterViewInit {
  @Input() data!: Format;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;
  selectedRowIndex = 2;

  constructor(private route: ActivatedRoute, private appService: AppService) {
    const resource: Res = this.route.snapshot.paramMap.get('resource') as Res;
    if (resource) {
      this.data = this.appService.getFormat(resource);
    }
    this.route.params.subscribe((params) => {
      this.data = this.appService.getFormat(params['resource'] as Res);
      this.ngOnInit();
      this.ngAfterViewInit();
    });
  }

  dataSource = new MatTableDataSource<Record<string, string>>();
  displayedColumns: string[] = [];

  allColumns: string[] = [];
  columns: ColumnHeader[] = [];
  rowCtrl = new FormControl('');
  filteredRows!: Observable<string[]>;
  @ViewChild('rowInput') rowInput!: ElementRef<HTMLInputElement>;

  async ngOnInit(): Promise<void> {
    this.displayedColumns = this.getNames();
    this.allColumns = this.getNames();
    this.columns = this.getNames().map((key) => ({
      header: key,
      tooltip: this.appService.getTooltip(this.data.structure.properties[key]),
    }));
    this.dataSource.data = Object.keys(this.data.values)
      .filter((key) => key !== 'structure')
      .map((key) => this.data.values[key]);

    this.filteredRows = this.rowCtrl.valueChanges.pipe(
      startWith(null),
      map((row: string | null) =>
        row
          ? this._filter(row)
          : this.allColumns
              .slice()
              .filter((row) => this.displayedColumns.indexOf(row) < 0)
      )
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  private getNames(): string[] {
    return Object.keys(this.data.structure.properties).filter(
      (key) => key !== '$schema'
    );
  }

  jumpTo() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const rectRow = document
        .getElementById('jumpto')
        ?.getBoundingClientRect();
      const table = document.getElementById('table');
      const rectTable = table?.getBoundingClientRect();
      if (rectRow && table && rectTable) {
        table.scrollTo({
          left: 0,
          top: rectRow?.y - rectTable?.y - 120,
          behavior: 'smooth',
        });
      }
    }
  }

  isSelected(row: { Name: string }) {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return false;
    return row.Name === id;
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.displayedColumns.push(event.option.viewValue);
    this.rowInput.nativeElement.value = '';
    this.rowCtrl.setValue(null);
  }

  remove(value: string) {
    this.displayedColumns = this.displayedColumns.filter(
      (row) => row !== value
    );
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our row
    if (value) {
      this.displayedColumns.push(value);
    }

    // Clear the input value
    event.chipInput.clear();

    this.rowCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allColumns
      .filter((row) => row.toLowerCase().includes(filterValue))
      .filter((row) => this.displayedColumns.indexOf(row) < 0);
  }

  elementType(value: { Value: string; Description: string }) {
    if (typeof value === 'undefined') return 'undefined';
    if (typeof value === 'boolean') return 'icon';
    if (typeof value.Value !== 'undefined') return 'icon-tooltip';
    return '';
  }
}
