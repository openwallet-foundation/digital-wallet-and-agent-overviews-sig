import { readdirSync, readFileSync, writeFileSync } from 'fs';

// function to merge all the individual wallet files into a single file
const files = readdirSync('../wallets');
const wallets = files.map(file => JSON.parse(readFileSync(`../wallets/${file}`)));
writeFileSync('src/assets/wallets.json', JSON.stringify(wallets, null, 2));
