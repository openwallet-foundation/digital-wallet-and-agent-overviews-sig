import Ajv from 'ajv';
import {readFileSync, readdirSync} from 'fs';

const ajv = new Ajv({allowUnionTypes: true});
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
  process.exit(1);
}
