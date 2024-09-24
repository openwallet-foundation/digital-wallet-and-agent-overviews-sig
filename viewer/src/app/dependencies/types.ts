/**
 * A dependency of a wallet
 */
export interface Dependency {
  // a unique name of the dependency
  name: string;
  // a link to the dependency, ideally to the github repository to fetch the latest version
  url: string;
  // a short description of the dependency
  description?: string;
  // a link to interact with the community of the dependency, e.g. a link to the slack or discord channel
  community?: string;
  // license of the dependency, like Apache 2.0 or MIT
  license?: string;
  // the programming language the dependency is written in
  language?: string;
}
