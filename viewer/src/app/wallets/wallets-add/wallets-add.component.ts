import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { WalletsService } from '../wallets.service';
import { FieldResponse } from '../types';
import { MatDividerModule } from '@angular/material/divider';
import { ClipboardModule, Clipboard } from '@angular/cdk/clipboard';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FlexLayoutServerModule } from '@ngbracket/ngx-layout/server';

@Component({
    selector: 'app-wallets-add',
    imports: [
        MatDialogModule,
        MatButtonModule,
        FlexLayoutModule,
        FlexLayoutServerModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSelectModule,
        MatIconModule,
        MatDividerModule,
        ClipboardModule,
        MatSnackBarModule,
    ],
    providers: [WalletsService],
    templateUrl: './wallets-add.component.html',
    styleUrl: './wallets-add.component.scss'
})
export class WalletsAddComponent implements OnInit {
  form!: FormGroup;
  values!: FieldResponse;

  constructor(
    public walletsService: WalletsService,
    private clipboard: Clipboard,
    private snackBar: MatSnackBar
  ) {}

  async ngOnInit(): Promise<void> {
    this.values = await this.walletsService.getDefinitions();
    this.form = new FormGroup({
      capability: new FormControl([], [Validators.required]),
      type: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      logo: new FormControl(''),
      company: new FormControl('', [Validators.required]),
      companyUrl: new FormControl(''),
      urlWebsite: new FormControl('', [Validators.required]),
      urlAppStore: new FormControl(''),
      urlGooglePlayStore: new FormControl(''),
      urlWebApp: new FormControl(''),
      downloadSource: new FormControl(''),
      openSource: new FormControl(false),
      license: new FormControl(''),
      portability: new FormControl(false),
    });

    this.walletsService.resources.forEach((resource) => {
      this.form.addControl(resource.id, new FormControl([]));
    });
  }

  getValues(key: string) {
    return this.values.definitions[key]?.enum;
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

    const json = {
      ...formValue,
      $schema: '../../schemas/wallet.json',
    };
    json.openSource = json.openSource == 'true' ? true : false;
    json.portability = json.portability == 'true' ? true : false;
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
    a.download = `${this.form.get('name')?.value}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
}
