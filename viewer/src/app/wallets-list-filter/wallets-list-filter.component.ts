import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { WalletsService } from '../wallets.service';
import { FieldResponse } from '../types';

export interface WalletFilter {
  type?: 'cloud' | 'edge';
  openSource?: 'true' | 'false';
  capability?: ('holder' | 'issuer' | 'verifier')[];
  portability?: 'true' | 'false';
  credentialFormats?: string[];
  credentialProfiles?: string[];
  issuanceProtocols?: string[];
  keyManagements?: string[];
  presentationProtocols?: string[];
  signingAlgorithms?: string[];
  statusManagements?: string[];
  trustManagements?: string[];
}

@Component({
  selector: 'app-wallets-list-filter',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    
// TODO: `HttpClientModule` should not be imported into a component directly.
// Please refactor the code to add `provideHttpClient()` call to the provider list in the
// application bootstrap logic and remove the `HttpClientModule` import from this component.
HttpClientModule,
  ],
  providers: [WalletsService],
  templateUrl: './wallets-list-filter.component.html',
  styleUrl: './wallets-list-filter.component.scss',
})
export class WalletsListFilterComponent implements OnInit {
  form!: FormGroup;
  values!: FieldResponse;

  constructor(
    @Inject(MAT_DIALOG_DATA) private filter: WalletFilter,
    private httpClient: HttpClient,
    public walletsService: WalletsService
  ) {}
  async ngOnInit(): Promise<void> {
    this.values = await this.walletsService.getDefinitions();
    this.form = new FormGroup({
      type: new FormControl(),
      openSource: new FormControl(),
      capability: new FormControl(),
      portability: new FormControl(),
    });
    this.walletsService.resources.forEach((resource) =>
      this.form.addControl(resource.id, new FormControl())
    );
    if (this.filter) {
      this.form.patchValue(this.filter);
    }
  }

  getValues(key: string) {
    return this.values.definitions[key]?.enum;
  }
}
