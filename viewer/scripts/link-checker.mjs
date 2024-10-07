// this script checks if all the links in the json files are still reachable
import { readdirSync, readFileSync } from 'fs';
import axios from 'axios';

let counter = 0;
let validFiles = 0;
let invalidFiles = 0;

async function isLinkReachable(url, filePath) {
  try {
    const response = await axios.head(url, { timeout: 5000 }); // 5 seconds timeout
    return response.status >= 200 && response.status < 400;
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      console.log(`Request timed out for URL: ${url} in file: ${filePath}`);
    } else {
      console.log(`Error reaching URL: ${url} in file: ${filePath} - ${error.message}`);
    }
    counter++;
    return false;
  }
}

async function checkLinksInObject(obj, filePath) {
  const promises = [];
  let hasUnreachableLinks = false;

  function collectPromises(obj) {
    for (const key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        collectPromises(obj[key]);
      } else if (typeof obj[key] === 'string' && obj[key].includes('http')) {
        promises.push(
          isLinkReachable(obj[key], filePath).then(isReachable => {
            if (!isReachable) {
              console.log(`Unreachable link found in ${filePath}: ${obj[key]}`);
              hasUnreachableLinks = true;
            }
          })
        );
      }
    }
  }

  collectPromises(obj);
  await Promise.all(promises);

  return !hasUnreachableLinks;
}

async function validateFolder(folder) {
  const files = readdirSync(folder);
  const promises = files
    .filter(file => file.endsWith('.json'))
    .map(async file => {
      const content = JSON.parse(readFileSync(`${folder}/${file}`, 'utf8'));
      const isValid = await checkLinksInObject(content, `${folder}/${file}`);
      if (isValid) {
        validFiles++;
      } else {
        invalidFiles++;
      }
    });

  await Promise.all(promises);
}

const folders = ['case-studies', 'wallets', 'dependencies'];

(async () => {
  for (const folder of folders) {
    counter = 0;
    validFiles = 0;
    invalidFiles = 0;
    await validateFolder('../' + folder);
    console.log(`Total unreachable links in ${folder}: ${counter}`);
    console.log(`Valid JSON files in ${folder}: ${validFiles}`);
    console.log(`Invalid JSON files in ${folder}: ${invalidFiles}`);
  }
})();
