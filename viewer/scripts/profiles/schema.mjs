import {readFileSync, writeFileSync, lstatSync, readdirSync, existsSync, mkdirSync} from 'fs';
import { folder, schemaFolder } from './values.mjs';
import { join } from 'path';

export function updateSchema() {
  const schemaPath = `${schemaFolder}/Credential-Profile.json`;
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

  const resources = Object.keys(file.properties);
  resources.push('Credential Profile');
  resources.forEach((key) => {
    key = key.startsWith('Key Management') ? 'Key Management' : key;
    const enums = getEnum(key);
    if(enums) {
      schema.definitions[key.replace(' ', '-')] = {
        description: `The used ${key}`,
        type: "string",
        enum: enums
      }
    }
  });
  writeFileSync(join(generatedFolder, 'fields.json'), JSON.stringify(schema, null, 2), 'utf8');

  function getEnum(subFolder) {
  // adds the resources to the schema file of the profile
      try {
          const info = lstatSync(`${folder}/${subFolder.replace(' ', '-')}`);
          if(info.isDirectory()) {
              return readdirSync(`${folder}/${subFolder.replace(' ', '-')}`).map((file) =>
                  JSON.parse(readFileSync(`${folder}/${subFolder.replace(' ', '-')}/${file}`, 'utf8')).Name
              );
          }
      } catch (e) {
          return null;
      }
  }
}
