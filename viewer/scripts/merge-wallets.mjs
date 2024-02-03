import { readdirSync, readFileSync, writeFileSync } from 'fs';

// function to parse the flattened_wallets.json and create individual wallet files
// const w = JSON.parse(readFileSync('../flattened_wallets.json'));
// w.forEach(element => {
//   element["$schema"] = "../schema.json";

//   const keys = Object.keys(element);
//   keys.forEach(key => {
//     if(element[key] === "") {
//       delete element[key];
//     }
//   });

//   //patch openSourceField to boolean
//   element.openSource = element.openSource === "Yes";
//   writeFileSync(`../wallets/${element.name}.json`, JSON.stringify(element, null, 2));
// });

// function to merge all the individual wallet files into a single file
const files = readdirSync('../wallets');
const wallets = files.map(file => JSON.parse(readFileSync(`../wallets/${file}`)));
writeFileSync('src/assets/wallets.json', JSON.stringify(wallets, null, 2));
