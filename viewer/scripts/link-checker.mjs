// this script checks if all the links in the json files are still reachable
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync, rmSync } from 'fs';
import axios from 'axios';
import { join, dirname } from 'path';

let counter = 0;
let validFiles = 0;
let invalidFiles = 0;
const errorLog = {};

async function isLinkReachable(url, filePath, jsonPath) {
  try {
    const response = await axios.get(url, {
      timeout: 10000, // 10 seconds timeout
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; LinkChecker/1.0)' },
      maxRedirects: 5
    });
    return response.status >= 200 && response.status < 400;
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      console.log(`Request timed out for URL: ${url} in file: ${filePath} at path: ${jsonPath}`);
    } else {
      console.log(`Error reaching URL: ${url} in file: ${filePath} at path: ${jsonPath} - ${error.message}`);
    }
    counter++;
    if (!errorLog[filePath]) {
      errorLog[filePath] = {};
    }
    errorLog[filePath][jsonPath] = url;
    return false;
  }
}

async function checkLinksInObject(obj, filePath, currentPath = '') {
  const promises = [];
  let hasUnreachableLinks = false;

  function collectPromises(obj, path) {
    for (const key in obj) {
      const newPath = path ? `${path}.${key}` : key;
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        collectPromises(obj[key], newPath);
      } else if (typeof obj[key] === 'string' && obj[key].includes('http')) {
        promises.push(
          isLinkReachable(obj[key], filePath, newPath).then(isReachable => {
            if (!isReachable) {
              console.log(`Unreachable link found in ${filePath} at path: ${newPath}: ${obj[key]}`);
              hasUnreachableLinks = true;
            }
          })
        );
      }
    }
  }

  collectPromises(obj, currentPath);
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
  const errorsDir = '../errors';
  if (!existsSync(errorsDir)) {
    mkdirSync(errorsDir);
  } else {
    // delete all files and subdirectories in the errors folder
    const files = readdirSync(errorsDir);
    for (const file of files) {
      rmSync(join(errorsDir, file), { recursive: true, force: true });
    }
  }

  for (const folder of folders) {
    counter = 0;
    validFiles = 0;
    invalidFiles = 0;
    await validateFolder('../' + folder);
    console.log(`Total unreachable links in ${folder}: ${counter}`);
    console.log(`Valid JSON files in ${folder}: ${validFiles}`);
    console.log(`Invalid JSON files in ${folder}: ${invalidFiles}`);
  }

  console.log('\nError Log:');
  for (const [filePath, errors] of Object.entries(errorLog)) {
    const relativePath = filePath.replace('../', '');
    const errorFilePath = join(errorsDir, relativePath);
    const errorDir = dirname(errorFilePath);

    if (!existsSync(errorDir)) {
      mkdirSync(errorDir, { recursive: true });
    }
    writeFileSync(errorFilePath, JSON.stringify(errors, null, 2));
  }
})();
