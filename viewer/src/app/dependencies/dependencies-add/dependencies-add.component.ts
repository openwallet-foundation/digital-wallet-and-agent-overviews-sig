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
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { GithubRepo } from '../github-response';
import { FlexLayoutServerModule } from '@ngbracket/ngx-layout/server';

@Component({
    selector: 'app-dependencies-add',
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
    ],
    templateUrl: './dependencies-add.component.html',
    styleUrl: './dependencies-add.component.scss'
})
export class DependenciesAddComponent implements OnInit {
  form!: FormGroup;

  languages: string[] = [];

  licenses: string[] = [];

  constructor(
    public dependenciesService: DependenciesService,
    private clipboard: Clipboard,
    private snackBar: MatSnackBar,
    private http: HttpClient
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
    this.form.get('url')?.valueChanges.subscribe((value: string) => {
      // get the information from github
      if (value.startsWith('https://github.com')) {
        this.fetchGitHubRepoInfo(value);
      }
    });
  }

  /**
   * Fetches the information from the GitHub API and writes it to the form.
   * @param url
   */
  private fetchGitHubRepoInfo(url: string): void {
    const repoPath = url.replace('https://github.com/', '');
    const apiUrl = `https://api.github.com/repos/${repoPath}`;

    firstValueFrom(this.http.get<GithubRepo>(apiUrl)).then(
      (data) => {
        this.form.patchValue({
          name: data.name,
          description: data.description,
          license: data.license?.name,
          language: data.language,
        });
      },
      (error) => {
        console.error('Error fetching GitHub repo info:', error);
      }
    );
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
      $schema: '../../schemas/dependency.json',
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
    a.download = `${this.form.get('name')?.value}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
}
