import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { DependenciesService } from '../dependencies.service';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutServerModule } from '@ngbracket/ngx-layout/server';

export interface DependencyFilter {
  license?: string;
  language?: string;
}

@Component({
  selector: 'app-dependencies-filter',
  imports: [
    ReactiveFormsModule,
    MatSelectModule,
    MatDialogModule,
    FlexLayoutModule,
    FlexLayoutServerModule,
    MatButtonModule,
  ],
  templateUrl: './dependencies-filter.component.html',
  styleUrl: './dependencies-filter.component.scss',
})
export class DependenciesFilterComponent implements OnInit {
  private filter = inject<DependencyFilter>(MAT_DIALOG_DATA);
  dependenciesService = inject(DependenciesService);

  form!: FormGroup;

  licenses: string[] = [];
  languages: string[] = [];

  constructor() {
    this.licenses = this.dependenciesService.getLicenses();
    this.languages = this.dependenciesService.getLaguages();
  }

  async ngOnInit(): Promise<void> {
    this.form = new FormGroup({
      license: new FormControl(),
      language: new FormControl(),
    });
    if (this.filter) {
      this.form.patchValue(this.filter);
    }
  }
}
