import { Injectable } from '@angular/core';
import { Wallet } from '../wallets/types';
import { dependencyData } from './dependencies-data';
import schema from '../../assets/dependency.schema.json';
import { Dependency } from './types';
import { walletData } from '../wallets/wallets-data';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { GithubRepo, GithubRepoFile } from './github-response';

@Injectable({
  providedIn: 'root',
})
export class DependenciesService {
  constructor(private http: HttpClient) {}

  getDependencies(): Dependency[] {
    return dependencyData;
  }

  /**
   * Returns all licenses that are used by the dependencies
   */
  getLicenses(): string[] {
    const licenses: string[] = [];
    this.getDependencies().forEach((dependency) => {
      if (dependency.license && !licenses.includes(dependency.license)) {
        licenses.push(dependency.license);
      }
    });
    return licenses;
  }

  /**
   * Returns all lanugages that are used by the dependencies
   * @returns
   */
  getLaguages(): string[] {
    const languages: string[] = [];
    this.getDependencies().forEach((dependency) => {
      if (dependency.language && !languages.includes(dependency.language)) {
        languages.push(dependency.language);
      }
    });
    return languages;
  }

  /**
   * Returns the dependencies of a wallet by filtering the dependencyData array by the wallet dependencies
   * @param wallet
   * @returns
   */
  getByWallet(wallet: Wallet) {
    if (!wallet.dependencies) return [];
    return dependencyData.filter((dependency) =>
      (wallet.dependencies as string[]).includes(dependency.id)
    );
  }

  /**
   * Returns the wallets that depend on the given dependency
   * @param name
   * @returns
   */
  getWallets(name: string) {
    return walletData.filter((wallet) =>
      (wallet.dependencies as string[])?.includes(name)
    );
  }

  /**
   * Returns the tooltip for the resource
   * @param resourceType
   * @returns
   */
  getTooltip(resourceType: keyof typeof schema.properties) {
    return schema.properties[resourceType].description;
  }

  /**
   * Fetches the information from the GitHub API and writes it to the form.
   * @param url
   */
  fetchGitHubRepoInfo(url: string): Promise<GithubRepo> {
    const repoPath = url.replace('https://github.com/', '');
    const apiUrl = `https://api.github.com/repos/${repoPath}`;
    return firstValueFrom(this.http.get<GithubRepo>(apiUrl));
  }

  fetchReadme(githubRepo: GithubRepo): Promise<string> {
    return firstValueFrom(
      this.http.get<GithubRepoFile>(
        `https://api.github.com/repos/${githubRepo.full_name}/readme`
      )
    ).then((response) =>
      firstValueFrom(
        this.http.get(response.download_url, { responseType: 'text' })
      ).then((content) =>
        this.updateRelativeLinks(
          `${githubRepo.html_url}/tree/${githubRepo.default_branch}`,
          content
        )
      )
    );
  }

  updateRelativeLinks(baseUrl: string, content: string): string {
    // Update image sources: ![alt text](relative/path.png)
    content = content.replace(/!\[(.*?)\]\((\/.*?)\)/g, `![$1](${baseUrl}$2)`);

    // Update links: [text](relative/path.md)
    content = content.replace(/\[(.*?)\]\((\/.*?)\)/g, `[$1](${baseUrl}$2)`);

    return content;
  }
}
