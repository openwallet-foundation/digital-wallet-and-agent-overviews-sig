import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import {readFileSync, readdirSync} from 'fs';
import axios from 'axios';

const ajv = new Ajv({allowUnionTypes: true});
addFormats(ajv);
const dependencyNames = [];
const walletNames = [];

// validate dependencies
function validateDependencies() {
  const validate = ajv.compile(JSON.parse(readFileSync('src/assets/dependency.schema.json')));
  const files = readdirSync('../dependencies');
  let success = true;
  files.map(file => {
    const dependency = JSON.parse(readFileSync(`../dependencies/${file}`))
    if(!validate(dependency)) {
      console.error(`Error validating ${file}:`);
      console.error(JSON.stringify(validate.errors, null, 2));
      success = false;
    }
    if(dependencyNames.includes(dependency.name)) {
      console.error(`Duplicate dependency name: ${dependency.name}`);
      success = false;
    }
    dependencyNames.push(dependency.name);
  });
  if(success) {
    console.info('All dependencies are valid');
  } else {
    console.error('Some dependencies are invalid');
    process.exit(1);
  }
}

async function validateWallets() {
  const profileSIGSchema = await axios.get('https://openwallet-foundation.github.io/credential-format-comparison-sig/assets/schemas/fields.json').then(res => res.data);
  ajv.addSchema(profileSIGSchema, "https://openwallet-foundation.github.io/credential-format-comparison-sig/assets/schemas/fields.json");
  const validate = ajv.compile(JSON.parse(readFileSync('src/assets/schema.json')));
  const files = readdirSync('../wallets');
  let success = true;
  files.map(file => {
    const wallet = JSON.parse(readFileSync(`../wallets/${file}`))
    if(!validate(wallet)) {
      console.error(`Error validating ${file}:`);
      console.error(JSON.stringify(validate.errors, null, 2));
      success = false;
    }
    if(walletNames.includes(wallet.name)) {
      console.error(`Duplicate wallet name: ${wallet.name}`);
      success = false;
    }
    walletNames.push(wallet.name);
    // validate the dependencies if the key is a valid one
    if(wallet.dependencies) {
      for(const dependency of wallet.dependencies) {
        if(!dependencyNames.includes(dependency)) {
          console.error(`dependency ${dependency} not found in dependencies`);
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
  const validate = ajv.compile(JSON.parse(readFileSync('src/assets/case-study.schema.json')));
  const files = readdirSync('../case-studies');
  let success = true;
  files.map(file => {
    const caseStudy = JSON.parse(readFileSync(`../case-studies/${file}`))
    if(!validate(caseStudy)) {
      console.error(`Error validating ${file}:`);
      console.error(JSON.stringify(validate.errors, null, 2));
      success = false;
    }
    // check if the referenced wallets exist
    caseStudy.references.forEach(element => {
      if(!walletNames.includes(element)) {
        console.error(`Referenced wallet ${element} not found in wallets`);
        success = false
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

validateDependencies();
await validateWallets();
validateCaseStudies();
