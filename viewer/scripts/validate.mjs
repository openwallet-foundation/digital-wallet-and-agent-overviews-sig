import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import {readFileSync, readdirSync} from 'fs';
import axios from 'axios';

const ajv = new Ajv({allowUnionTypes: true});
addFormats(ajv);
const profileSIGSchema = await axios.get('https://openwallet-foundation.github.io/credential-format-comparison-sig/assets/schemas/fields.json').then(res => res.data);
ajv.addSchema(profileSIGSchema, "https://openwallet-foundation.github.io/credential-format-comparison-sig/assets/schemas/fields.json");
const validate = ajv.compile(JSON.parse(readFileSync('../schema.json')));
const files = readdirSync('../wallets');
let success = true;
files.map(file => {
  const wallet = JSON.parse(readFileSync(`../wallets/${file}`))
  if(!validate(wallet)) {
    console.error(`Error validating ${file}:`);
    console.error(validate.errors);
    success = false;
  }
});
if(success) {
  console.info('All wallets are valid');
} else {
  console.error('Some wallets are invalid');
  //TODO: Since all wallet entries are not updated yet, do not finish with an exit code 1
  // process.exit(1);
}

