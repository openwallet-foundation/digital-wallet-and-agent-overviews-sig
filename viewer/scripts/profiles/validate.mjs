import {readdirSync, readFileSync, rmSync, writeFileSync} from 'fs';
import process from 'process';
import { defFile, folder, schemaFolder, structureFile } from './values.mjs';
import Ajv from 'ajv';
import { join } from 'path';


export function validateProfiles() {
  // pattern to match windows compliant file names
  const pattern = /^(?!^(PRN|AUX|CON|NUL|COM[1-9]|LPT[1-9])(\..*)?$)[^<>:"/\\|?*]+$/;

  let error = false;
  //will loop through all the files and will check if the entries match with the structure defined in the info.json file.
  readdirSync(folder).forEach((subFolder) => {
      const infoFile = readFileSync(`${schemaFolder}/${subFolder}.json`, 'utf8');
      if(!infoFile) {
          console.log(`No schema file found for ${subFolder}`);
          process.exit(1);
      }
      const ajv = new Ajv({allowUnionTypes: true});
      const def = JSON.parse(readFileSync("src/assets/schemas/fields.json"));
      ajv.addSchema(def, 'viewer/src/assets/schemas/fields.json');
      const validate = ajv.addSchema(JSON.parse(readFileSync(join(schemaFolder, defFile)))).compile(JSON.parse(infoFile));
      const uniqueNames = [];
      readdirSync(`${folder}/${subFolder}`).filter(file => file !== structureFile).forEach((file) => {
          // check path compliance
          if(!pattern.test(file)) {
              console.log(`File "../data/${subFolder}/${file}" does not match the pattern: ${pattern}}`);
              error = true;
          }
          // check schema compliance
          const content = JSON.parse(readFileSync(`${folder}/${subFolder}/${file}`));
          if(!validate(content)) {
              console.log(`File "../data/${subFolder}/${file}" is invalid`);
              console.log(JSON.stringify(validate.errors, null ,2));
              error = true;
          }
          // check duplicate names
          const name =  content['Name']
          if(uniqueNames.includes(name)) {
              console.log(`File "../data/${subFolder}/${file}" has a duplicate name: ${name}`);
              error = true;
          } else {
              uniqueNames.push(name);
          }
      });
  });
  if(error) {
      console.error(`At least one file is invalid`);
  } else {
      console.log(`All files are valid`);
  }
}
