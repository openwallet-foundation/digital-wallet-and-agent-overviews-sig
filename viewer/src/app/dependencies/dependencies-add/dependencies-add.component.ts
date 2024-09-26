import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { DependenciesService } from '../dependencies.service';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ClipboardModule, Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-dependencies-add',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatDividerModule,
    MatSelectModule,
    MatButtonModule,
    MatAutocompleteModule,
    FlexLayoutModule,
    MatSnackBarModule,
    ClipboardModule,
  ],
  templateUrl: './dependencies-add.component.html',
  styleUrl: './dependencies-add.component.scss',
})
export class DependenciesAddComponent implements OnInit {
  form!: FormGroup;

  languages: string[] = [];

  licenses: string[] = [];

  constructor(
    public dependenciesService: DependenciesService,
    private clipboard: Clipboard,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      url: new FormControl('', Validators.required),
      community: new FormControl(''),
      license: new FormControl('', Validators.required),
      language: new FormControl('', Validators.required),
    });
    this.licenses = this.dependenciesService.getLicenses();
    this.languages = this.dependenciesService.getLaguages();
  }

  getJSON() {
    const removeEmptyStrings = (obj: any) => {
      Object.keys(obj).forEach((key) => {
        if (obj[key] && typeof obj[key] === 'object') {
          removeEmptyStrings(obj[key]);
        } else if (obj[key] === '') {
          delete obj[key];
        }
      });
    };

    const formValue = { ...this.form.value };
    removeEmptyStrings(formValue);

    const json = {
      ...formValue,
      $schema: '../viewer/src/assets/dependency.schema.json',
    };
    return JSON.stringify(json, null, 2);
  }

  copy() {
    this.clipboard.copy(this.getJSON());
    this.snackBar.open('Copied to clipboard', 'Dismiss', { duration: 3000 });
  }
}
