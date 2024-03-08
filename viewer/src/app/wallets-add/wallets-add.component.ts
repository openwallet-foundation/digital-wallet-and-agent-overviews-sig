import { HttpClientModule } from '@angular/common/http';
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

@Component({
  selector: 'app-wallets-add',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatDividerModule,
    HttpClientModule,
    ClipboardModule,
    MatSnackBarModule,
  ],
  providers: [WalletsService],
  templateUrl: './wallets-add.component.html',
  styleUrl: './wallets-add.component.scss',
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
      name: new FormControl('', [Validators.required]),
      logo: new FormControl(''),
      company: new FormControl('', [Validators.required]),
      CompanyUrl: new FormControl(''),
      type: new FormControl('', [Validators.required]),
      openSource: new FormControl(false, [Validators.required]),
      license: new FormControl('', [Validators.required]),
      capability: new FormControl([]),
      portability: new FormControl(),
      linkToApp: new FormControl(''),
    });

    this.walletsService.resources.forEach((resource) => {
      this.form.addControl(resource.id, new FormControl([]));
    });
  }

  getValues(key: string) {
    return this.values.definitions[key]?.enum;
  }

  getJSON() {
    return JSON.stringify(
      { ...this.form.value, $schema: '../schema.json' },
      null,
      2
    );
  }
  copy() {
    this.clipboard.copy(this.getJSON());
    this.snackBar.open('Copied to clipboard', 'Dismiss', { duration: 3000 });
  }
}
