import { existsSync, readdirSync, readFileSync, writeFileSync } from 'fs';
import { mergeProfiles } from './profiles/merge.mjs';

// URL for the folder containing the wallet files in the GitHub repo
const commitHistoryBase = 'https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/';

// Paths
const DEPENDENCIES_PATH = '../data/dependencies';
const CASE_STUDIES_PATH = '../data/case-studies';
const WALLETS_PATH = '../data/wallets';
const OUTPUT_PATH = 'src/app';

// Function to read and process JSON files from a directory
const readAndProcessFiles = (directory, processFile) => {
  if(!existsSync(directory)) {
    return [];
  }
  const files = readdirSync(directory);
  return files.map(file => {
    const json = JSON.parse(readFileSync(`${directory}/${file}`));
    json.id = file.slice(0, -5);
    return processFile(json, file);
  });
};

// Process functions
const processDependencyFile = (json) => {
  delete json['$schema'];
  return json;
};

const processCaseStudyFile = (json) => {
  delete json['$schema'];
  return json;
};

const processWalletFile = (json, file) => {
  json.commitHistory = commitHistoryBase + file;
  delete json['$schema'];
  return json;
};

// Read and process files
const dependencies = readAndProcessFiles(DEPENDENCIES_PATH, processDependencyFile);
const caseStudies = readAndProcessFiles(CASE_STUDIES_PATH, processCaseStudyFile);
const wallets = readAndProcessFiles(WALLETS_PATH, processWalletFile);

// Function to generate TypeScript content
const generateTsContent = (type, data) => `
import { ${type} } from './types';

export const ${type.toLowerCase()}Data: ${type}[] = ${JSON.stringify(data, null, 2)};
`;

// Write to TypeScript files
const writeTsFile = (filename, content) => {
  writeFileSync(`${OUTPUT_PATH}/${filename}`, content);
  console.log(`Merged files into ${OUTPUT_PATH}/${filename}`);
};

// Generate and write TypeScript content
writeTsFile('wallets/wallets-data.generated.ts', generateTsContent('Wallet', wallets));
writeTsFile('dependencies/dependencies-data.generated.ts', generateTsContent('Dependency', dependencies));
writeTsFile('case-studies/case-studies-data.generated.ts', generateTsContent('CaseStudy', caseStudies));

mergeProfiles();
