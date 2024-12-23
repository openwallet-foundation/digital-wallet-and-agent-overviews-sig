import { Component, OnInit } from '@angular/core';
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
import { FlexLayoutServerModule } from '@ngbracket/ngx-layout/server';
import { CaseStudy, CaseStudySage } from '../types';

@Component({
    selector: 'app-case-studies-add',
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
        FlexLayoutServerModule,
        MatSnackBarModule,
        ClipboardModule,
        MatChipsModule,
        MatDatepickerModule,
        FormsModule,
    ],
    templateUrl: './case-studies-add.component.html',
    styleUrl: './case-studies-add.component.scss'
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

  caseStudiesStages: CaseStudySage[] = ['poc', 'production', 'retired'];

  constructor(
    public caseStudiesService: CaseStudiesService,
    private clipboard: Clipboard,
    private snackBar: MatSnackBar,
    private walletsService: WalletsService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      headline: new FormControl('', [
        Validators.required,
        Validators.maxLength(60),
      ]),
      summary: new FormControl('', [
        Validators.required,
        Validators.maxLength(1000),
      ]),
      createdAt: new FormControl('', Validators.required),
      imageUrl: new FormControl(''),
      url: new FormControl('', Validators.required),
      stage: new FormControl('', Validators.required),
      hashTags: new FormControl([]),
      // could also be implemented as autocomplete chips, but
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
    const removeEmptyStrings = (obj: Record<string, unknown>) => {
      Object.keys(obj).forEach((key) => {
        if (obj[key] && typeof obj[key] === 'object') {
          removeEmptyStrings(obj[key] as Record<string, unknown>);
        } else if (obj[key] === '') {
          delete obj[key];
        }
      });
    };

    const formValue = { ...this.form.value };
    removeEmptyStrings(formValue);

    // Format the createdAt date to RFC3339
    if (formValue.createdAt) {
      const date = new Date(formValue.createdAt);
      formValue.createdAt = date.toISOString().split('T')[0];
    }

    const json = {
      ...formValue,
      $schema: '../../schemas/case-study.json',
    };
    return JSON.stringify(json, null, 2);
  }

  copy() {
    this.clipboard.copy(this.getJSON());
    this.snackBar.open('Copied to clipboard', 'Dismiss', { duration: 3000 });
  }

  downloadFile() {
    const json = this.getJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const name = this.form
      .get('headline')
      ?.value.split(' ')
      .join('-')
      .toLowerCase();
    a.download = `${name}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  addDemoEntry() {
    const caseStudy: Omit<CaseStudy, 'id'> = {
      headline:
        'Spherity and RCS Global introduce the first Catena-X Certified Battery Passport Solution',
      summary:
        'Spherity and RCS Global have launched the first Catena-X certified Battery Passport Solution called Claritas. This solution enhances transparency in the battery supply chain, ensuring compliance with global sustainability and ethical sourcing standards. Integrating seamlessly with the Catena-X ecosystem, it facilitates data exchange and lifecycle management, supporting circular economy goals. The passport helps companies meet EU regulations, reduce costs, and improve sustainability reporting, focusing on repair, recycling, and carbon footprint management. This innovation marks a significant step toward responsible battery production and supply chain accountability.',
      createdAt: '2024-05-15',
      stage: 'production',
      imageUrl:
        'https://cdn.prod.website-files.com/66a91e51440a74950f23fc8f/66c6c510b1a8b8421be7f9b3_Spherity%20x%20RCS%20Global-Catena-x%20certifed%201%20updated.jpg',
      url: 'https://www.spherity.com/newsroom/catena-x-certified-battery-passport-solution',
      hashTags: ['Battery Passport', 'CatenaX', 'Sustanability'],
      references: ['spherity-wallet'],
      stakeholders: [
        {
          name: 'RCS Global',
        },
      ],
      $schema: '../../schemas/case-study.json',
    };
    this.form.patchValue(caseStudy);
  }
}
