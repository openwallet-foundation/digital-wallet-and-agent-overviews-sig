import { readdirSync, readFileSync, writeFileSync } from 'fs';

// url for the folder containing the wallet files in the GitHub repo
const commitHistoryBase = 'https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/'

// function to merge all the individual wallet files into a single file
const files = readdirSync('../wallets');
// const wallets = files.map(file => JSON.parse(readFileSync(`../wallets/${file}`)));
const wallets = []
for (const file of files) {
  try {
    const json = JSON.parse(readFileSync(`../wallets/${file}`))
    json.commitHistory = commitHistoryBase + file
    wallets.push(json)
  }
  catch(e) {
    console.warn(`Error parsing ${file}: ${e}`)
  }
}
writeFileSync('src/assets/wallets.json', JSON.stringify(wallets, null, 2));
