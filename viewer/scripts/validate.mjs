import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { existsSync, readFileSync, readdirSync } from 'fs';
import { validateProfiles } from './profiles/validate.mjs';
import './merge-wallets.mjs';

const ajv = new Ajv({ allowUnionTypes: true });
addFormats(ajv);

const DATA_PATH = '../data';
const DEPENDENCIES_PATH = '../data/dependencies';
const WALLETS_PATH = '../data/wallets';
const CASE_STUDIES_PATH = '../data/case-studies';
const DEPENDENCY_SCHEMA_PATH = '../schemas/dependency.json';
const WALLET_SCHEMA_PATH = '../schemas/wallet.json';
const CASE_STUDY_SCHEMA_PATH = '../schemas/case-study.json';

const dependencyIds = [];
const walletIds = [];

// Mapping from wallet property names to data folder names
const RESOURCE_FOLDERS = {
  credentialProfiles: 'credential-profiles',
  credentialFormats: 'credential-formats',
  signingAlgorithms: 'signing-algorithms',
  statusManagements: 'status-algorithms',
  keyManagements: 'key-managements',
  issuanceProtocols: 'issuance-protocols',
  presentationProtocols: 'presentation-protocols',
  trustManagements: 'trust-managements',
};

// Cache for valid names from data folders
const validNames = {};

// Get valid names from a data folder
function getValidNames(folderName) {
  if (validNames[folderName]) {
    return validNames[folderName];
  }
  const folderPath = `${DATA_PATH}/${folderName}`;
  if (!existsSync(folderPath)) {
    validNames[folderName] = [];
    return validNames[folderName];
  }
  validNames[folderName] = readdirSync(folderPath)
    .filter(file => file.endsWith('.json'))
    .map(file => JSON.parse(readFileSync(`${folderPath}/${file}`, 'utf8')).Name);
  return validNames[folderName];
}

// Helper function to normalize filenames
function normalizeFilename(filename) {
  return filename.toLowerCase().replace(/\s+/g, '-');
}

// Check files in a folder to ensure they meet the desired format
function checkFilesInFolder(folder) {
  if (!existsSync(folder)) {
    console.info(`No files found in ${folder}`);
    return [];
  }
  const files = readdirSync(folder);
  files.forEach(file => {
    const newFileName = normalizeFilename(file);
    if (file !== newFileName) {
      throw new Error(`Invalid filename: ${file} should be ${newFileName}`);
    }
  });
  return files;
}

// Validate JSON files against a schema
function validateFiles(files, folder, schemaPath, idArray, additionalChecks = () => true) {
  const validate = ajv.compile(JSON.parse(readFileSync(schemaPath)));
  let success = true;
  files.forEach(file => {
    const data = JSON.parse(readFileSync(`${folder}/${file}`));
    if (!validate(data)) {
      console.error(`Error validating ${file}:`);
      console.error(JSON.stringify(validate.errors, null, 2));
      success = false;
    }
    const fileName = file.slice(0, -5);
    idArray.push(fileName);
    if (!additionalChecks(data, fileName)) {
      success = false;
    }
  });
  return success;
}

// Validate dependencies
function validateDependencies() {
  const files = checkFilesInFolder(DEPENDENCIES_PATH).map(normalizeFilename);
  const success = validateFiles(files, DEPENDENCIES_PATH, DEPENDENCY_SCHEMA_PATH, dependencyIds);
  if (success) {
    console.info('All dependencies are valid');
  } else {
    console.error('Some dependencies are invalid');
    process.exit(1);
  }
}

// Validate wallets
function validateWallets() {
  const files = checkFilesInFolder(WALLETS_PATH).map(normalizeFilename);
  const success = validateFiles(files, WALLETS_PATH, WALLET_SCHEMA_PATH, walletIds, (wallet, fileName) => {
    let isValid = true;

    // Check dependencies
    if (wallet.dependencies) {
      for (const dependency of wallet.dependencies) {
        if (!dependencyIds.includes(dependency)) {
          console.error(`[${fileName}]: dependency "${dependency}" not found in dependencies`);
          isValid = false;
        }
      }
    }

    // Check all resource references
    for (const [property, folder] of Object.entries(RESOURCE_FOLDERS)) {
      if (wallet[property]) {
        const validValues = getValidNames(folder);
        for (const value of wallet[property]) {
          if (!validValues.includes(value)) {
            console.error(`[${fileName}]: ${property} value "${value}" not found in ${folder}`);
            isValid = false;
          }
        }
      }
    }

    return isValid;
  });
  if (success) {
    console.info('All wallets are valid');
  } else {
    console.error('Some wallets are invalid');
    process.exit(1);
  }
}

// Validate case studies
function validateCaseStudies() {
  const files = checkFilesInFolder(CASE_STUDIES_PATH).map(normalizeFilename);
  const success = validateFiles(files, CASE_STUDIES_PATH, CASE_STUDY_SCHEMA_PATH, [], (caseStudy) => {
    for (const reference of caseStudy.references) {
      if (!walletIds.includes(reference)) {
        console.error(`Referenced wallet ${reference} not found in wallets`);
        return false;
      }
    }
    return true;
  });
  if (success) {
    console.info('All case studies are valid');
  } else {
    console.error('Some case studies are invalid');
    process.exit(1);
  }
}

async function main() {
  validateDependencies();
  validateWallets();
  validateCaseStudies();
  validateProfiles();
}

main().catch(err => {
  console.error('An error occurred:', err);
  process.exit(1);
});
