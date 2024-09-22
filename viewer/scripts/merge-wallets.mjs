import { readdirSync, readFileSync, writeFileSync } from 'fs';

// url for the folder containing the wallet files in the GitHub repo
const commitHistoryBase = 'https://github.com/openwallet-foundation/digital-wallet-and-agent-overviews-sig/commits/main/wallets/'


const dependenciesFiles = readdirSync('../dependencies');

const dependencies = dependenciesFiles.map(file => {
    const json = JSON.parse(readFileSync(`../dependencies/${file}`));
    delete json['$schema'];
    return json;
});

const caseStudiesFiles = readdirSync('../case-studies');

const caseStudies = caseStudiesFiles.map(file => {
    const json = JSON.parse(readFileSync(`../case-studies/${file}`));
    delete json['$schema'];
    return json;
});


// function to merge all the individual wallet files into a single file
const files = readdirSync('../wallets');

const wallets = [];
for (const file of files) {
  try {
    const json = JSON.parse(readFileSync(`../wallets/${file}`));
    json.commitHistory = commitHistoryBase + file;
    // for now we insert the dependencies instead of just referencing them
    if(json.dependencies) {
      json.dependencies = json.dependencies.map(dependency =>
         dependencies.find(d => d.name === dependency)
      );
    }
    // we add the case studies to the wallet object to make it easier to access them
    json.caseStudies = caseStudies.filter(c => c.reference === json.name);
    if(json.caseStudies.length > 0) {
      console.log(json.caseStudies)
    }
    wallets.push(json)
  }
  catch(e) {
    console.warn(`Error parsing ${file}: ${e}`)
    process.exit(1);
  }
}
writeFileSync('src/assets/wallets.json', JSON.stringify(wallets, null,));
console.log(`Merged ${files.length} wallet files into src/assets/wallets.json`);
