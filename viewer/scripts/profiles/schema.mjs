import {readFileSync, writeFileSync, lstatSync, readdirSync, existsSync, mkdirSync} from 'fs';
import { folder, schemaFolder } from './values.mjs';
import { join } from 'path';

export function copySchema() {
  const files = readdirSync(schemaFolder);
  for(const file of files) {
    writeFileSync(join('src/assets/schemas', file), readFileSync(join(schemaFolder, file), 'utf8'), 'utf8');
  }
}

export function updateSchema() {
  const schemaPath = `${schemaFolder}/credential-profile.json`;
  const file = JSON.parse(readFileSync(schemaPath, 'utf8'));
  const generatedFolder = "src/assets/schemas";

  if(!existsSync(generatedFolder)) {
    mkdirSync(generatedFolder);
  }
  const schema = {
    "$schema": "http://json-schema.org/draft-07/schema",
    "$id": "fields.json",
    type: "object",
    definitions: {}
  }
  console.log(file);
  const resources = Object.keys(file.properties);
  resources.push('Credential Profile');
  resources.forEach((key) => {
    key = key.startsWith('Key Management') ? 'Key Management' : key;
    const enums = getEnum(key);
    if(enums) {
      console.log("enums")
      console.log(enums);
      schema.definitions[key.replace(' ', '-')] = {
        description: `The used ${key}`,
        type: "string",
        enum: enums
      }
    }
  });
  writeFileSync(join(generatedFolder, 'fields.json'), JSON.stringify(schema, null, 2), 'utf8');
  console.log("writing schema to src/assets/schemas/fields.json");
  copySchema();
}

function getEnum(subFolder) {
  // adds the resources to the schema file of the profile
  try {
      const s = (subFolder.replace(' ', '-')).toLowerCase() + 's';
        const info = lstatSync(`${folder}/${s}`);
        console.log(`${folder}/${s}`);
        if(info.isDirectory()) {
            return readdirSync(`${folder}/${s}`).map((file) =>
                JSON.parse(readFileSync(`${folder}/${s}/${file}`, 'utf8')).Name
            );
        }
    } catch (e) {
      console.log(e);
        return null;
    }
}
