import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { schemaFolder, folder, mergedStructure, structureFile, defFile, githubPath, ignoreFiles } from './values.mjs';
import { join } from 'path';
import { updateSchema } from './schema.mjs';

export function mergeProfiles() {
  // merges the json files to one json file
  const input = {};
  // loop through all subfolders
  readdirSync(schemaFolder).filter(file => !ignoreFiles.includes(file.split('.')[0])).forEach((resource) => {
      if(resource === defFile) {
        input['defs'] = JSON.parse(readFileSync(join(schemaFolder, resource), 'utf8'));
        return;
      }
      console.log("adding", resource);
      // create a new json object for each subfolder
      const subFolder = resource.slice(0, -5);

      let content = readFileSync(join(schemaFolder, resource), 'utf8');
      content = content.replaceAll('"$ref": "defs.json', `"$ref": "${githubPath}/main/schemas/defs.json`);
      const structure = JSON.parse(content);
      const name = capitalizeWords(subFolder.replace(/-/g, ' '));
      input[name] = {
          structure,
          values: {}
      };
      // write the content of the file to the json object
      readdirSync(join(folder, subFolder + 's')).filter(file => file !== structureFile).forEach((file) => {
          // write the content of the file to the json object
          const content = JSON.parse(readFileSync(join(folder, subFolder + 's', file), 'utf8'));
          content['$schema'] = content['$schema'].replace('../..', `/main/${githubPath}`);
          const name = capitalizeWords(subFolder.replace(/-/g, ' '));
          input[name].values[content.Name] = content;
      });
  });
  //TODO: think about to separate the structure and the values files in the future so others can query only the information they need
  // write the final json object to a file
  writeFileSync(mergedStructure, JSON.stringify(input));
  updateSchema();
}

function capitalizeWords(str) {
  return str.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
