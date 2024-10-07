import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import {existsSync, readFileSync, readdirSync} from 'fs';
import axios from 'axios';
import { join } from 'path';

const ajv = new Ajv({allowUnionTypes: true});
addFormats(ajv);
const dependencyIds = [];
const walletIds = [];

// Helper function to normalize filenames
function normalizeFilename(filename) {
  return filename.toLowerCase().replace(/\s+/g, '-');
}

// Check files in a folder to ensure they meet the desired format
function checkFilesInFolder(folder) {
  const files = readdirSync(folder);
  console.log(files);
  files.forEach(file => {
    const newFileName = normalizeFilename(file);
    if (file !== newFileName) {
      throw new Error(`Invalid filename: ${file} should be ${newFileName}`);
    }
  });
}

// validate dependencies
function validateDependencies() {
  checkFilesInFolder('../dependencies');
  const validate = ajv.compile(JSON.parse(readFileSync('src/assets/dependency.schema.json')));
  const files = readdirSync('../dependencies').map(normalizeFilename);
  let success = true;
  files.map(file => {
    const dependency = JSON.parse(readFileSync(`../dependencies/${file}`));
    if(!validate(dependency)) {
      console.error(`Error validating ${file}:`);
      console.error(JSON.stringify(validate.errors, null, 2));
      success = false;
    }
    const fileName = file.slice(0, -5);
    dependencyIds.push(fileName);
  });
  if(success) {
    console.info('All dependencies are valid');
  } else {
    console.error('Some dependencies are invalid');
    process.exit(1);
  }
}

async function validateWallets() {
  checkFilesInFolder('../wallets');
  const profileSIGSchema = await axios.get('https://openwallet-foundation.github.io/credential-format-comparison-sig/assets/schemas/fields.json').then(res => res.data);
  ajv.addSchema(profileSIGSchema, "https://openwallet-foundation.github.io/credential-format-comparison-sig/assets/schemas/fields.json");
  const validate = ajv.compile(JSON.parse(readFileSync('src/assets/schema.json')));
  const files = readdirSync('../wallets').map(normalizeFilename);
  let success = true;
  files.map(file => {
    const wallet = JSON.parse(readFileSync(`../wallets/${file}`));
    if(!validate(wallet)) {
      console.error(`Error validating ${file}:`);
      console.error(JSON.stringify(validate.errors, null, 2));
      success = false;
    }
    const fileName = file.slice(0, -5);
    walletIds.push(fileName);
    // validate the dependencies if the key is a valid one
    if(wallet.dependencies) {
      for(const dependency of wallet.dependencies) {
        if(!dependencyIds.includes(dependency)) {
          console.error(`[${fileName}]: dependency ${dependency} not found in dependencies`);
          success = false;
        }
      }
    }
  });
  if(success) {
    console.info('All wallets are valid');
  } else {
    console.error('Some wallets are invalid');
    process.exit(1);
  }
}

function validateCaseStudies() {
  checkFilesInFolder('../case-studies');
  const validate = ajv.compile(JSON.parse(readFileSync('src/assets/case-study.schema.json')));
  // needed in case no folder is there
  if(!existsSync('../case-studies')) {
    console.info('No case studies found');
    return;
  }
  const files = readdirSync('../case-studies').map(normalizeFilename);
  let success = true;
  files.map(file => {
    const caseStudy = JSON.parse(readFileSync(`../case-studies/${file}`));
    if(!validate(caseStudy)) {
      console.error(`Error validating ${file}:`);
      console.error(JSON.stringify(validate.errors, null, 2));
      success = false;
    }
    // check if the referenced wallets exist
    caseStudy.references.forEach(element => {
      if(!walletIds.includes(element)) {
        console.error(`Referenced wallet ${element} not found in wallets`);
        success = false;
      }
    });
  });
  if(success) {
    console.info('All case studies are valid');
  } else {
    console.error('Some case studies are invalid');
    process.exit(1);
  }
}

checkFilesInFolder('../dependencies');
validateDependencies();
await validateWallets();
checkFilesInFolder('../case-studies');
validateCaseStudies();
