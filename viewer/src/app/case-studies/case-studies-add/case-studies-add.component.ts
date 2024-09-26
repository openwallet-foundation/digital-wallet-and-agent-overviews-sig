import { Component, ElementRef, model, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormArray,
  FormsModule,
} from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Clipboard, ClipboardModule } from '@angular/cdk/clipboard';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { CaseStudiesService } from '../case-studies.service';
import { WalletsService } from '../../wallets/wallets.service';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Wallet } from '../../wallets/types';

@Component({
  selector: 'app-case-studies-add',
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
    MatChipsModule,
    MatDatepickerModule,
    FormsModule,
  ],
  templateUrl: './case-studies-add.component.html',
  styleUrl: './case-studies-add.component.scss',
})
export class CaseStudiesAddComponent implements OnInit {
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  getFormArray(value: unknown): FormArray {
    return value as FormArray;
  }
  form!: FormGroup;

  allHashTags: string[] = [];

  filteredHashTags: string[] = [];

  references: Wallet[] = [];

  constructor(
    public caseStudiesService: CaseStudiesService,
    private clipboard: Clipboard,
    private snackBar: MatSnackBar,
    private walletsService: WalletsService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      headline: new FormControl('', Validators.required),
      summary: new FormControl('', Validators.required),
      createdAt: new FormControl('', Validators.required),
      imageUrl: new FormControl(''),
      url: new FormControl('', Validators.required),
      hashTags: new FormControl([], Validators.required),
      references: new FormControl('', Validators.required),
      stakeholders: new FormArray([
        new FormGroup({
          name: new FormControl('', Validators.required),
          contact: new FormControl(''),
        }),
      ]),
    });
    this.allHashTags = this.caseStudiesService.getTags();
    this.references = this.walletsService
      .loadWallets()
      .sort((a, b) => a.id.toLowerCase().localeCompare(b.id.toLowerCase()));
    this.setFilter('');
  }

  addStakeHolder() {
    const stakeholders = this.form.get('stakeholders') as FormArray;
    stakeholders.push(
      new FormGroup({
        name: new FormControl('', Validators.required),
        contact: new FormControl(''),
      })
    );
  }

  removeStakeHolder(index: number) {
    const stakeholders = this.form.get('stakeholders') as FormArray;
    stakeholders.removeAt(index);
  }

  addReference() {
    const references = this.form.get('references') as FormArray;
    references.push(new FormControl('', Validators.required));
  }

  getHashTags() {
    return this.form.get('hashTags')?.value;
  }

  setFilter(input: string) {
    this.filteredHashTags = this.allHashTags.filter(
      (tag) =>
        !this.getHashTags().includes(tag) &&
        tag.toLowerCase().includes(input.toLowerCase().trim())
    );
  }

  addHashtag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.form.patchValue({ hashTags: [...this.getHashTags(), value] });
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  selectedHashTag(
    event: MatAutocompleteSelectedEvent,
    input: HTMLInputElement
  ): void {
    this.form.patchValue({
      hashTags: [...this.getHashTags(), event.option.viewValue],
    });
    event.option.deselect();
    input.value = '';
    this.setFilter('');
  }

  removeHashtag(hashTag: string) {
    const hashTags = this.getHashTags();
    const index = hashTags.indexOf(hashTag);

    if (index >= 0) {
      hashTags.splice(index, 1);
      this.form.patchValue({ hashTags });
    }
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
      $schema: '../viewer/src/assets/case-study.schema.json',
    };
    return JSON.stringify(json, null, 2);
  }

  copy() {
    this.clipboard.copy(this.getJSON());
    this.snackBar.open('Copied to clipboard', 'Dismiss', { duration: 3000 });
  }
}
