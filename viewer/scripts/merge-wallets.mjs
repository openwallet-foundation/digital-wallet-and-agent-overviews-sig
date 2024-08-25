import { readdirSync, readFileSync, writeFileSync } from 'fs';

// url for the folder containing the wallet files in the GitHub repo
const commitHistoryBase = 'https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/'

// function to merge all the individual wallet files into a single file
const files = readdirSync('../wallets');
const wallets = []
for (const file of files) {
  try {
    const json = JSON.parse(readFileSync(`../wallets/${file}`));
    json.commitHistory = commitHistoryBase + file;
    // for now we insert the dependencies instead of just referencing them
    if(json.dependencies) {
      json.dependencies = json.dependencies.map(dependencies => {
        try {
          const content = JSON.parse(readFileSync(`../dependencies/${dependencies}.json`));
          content['$schema'] = undefined;
          return content;
         }
        catch(e) {
          console.warn(`Error parsing ${dependencies}.json: ${e}`)
          return dependencies;
        }
      });
    }
    wallets.push(json)
  }
  catch(e) {
    console.warn(`Error parsing ${file}: ${e}`)
  }
}
writeFileSync('src/assets/wallets.json', JSON.stringify(wallets));
