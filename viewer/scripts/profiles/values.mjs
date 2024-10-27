export const folder = "../data";
export const schemaFolder = "../schemas";
export const defFile = "defs.json";
export const structureFile = 'schema.json';
export const mergedStructure = './src/assets/structure.json';
export const githubPath = 'https://raw.githubusercontent.com/openwallet-foundation/credential-format-comparison-sig';

//export const  ignoreFiles = ['case-study', 'dependency', 'wallet'];

// mapping from data folder to schema file
export const folderMapping = {
  "case-studies": "case-study",
  "credential-formats": "credential-format",
  "credential-profiles": "credential-profile",
  "dependencies": "dependency",
  "issuance-protocols": "issuance-protocol",
  "key-managements": "key-management",
  "presentation-protocols": "presentation-protocol",
  "signing-algorithms": "signing-algorithm",
  "status-algorithms": "status-algorithm",
  "trust-managements": "trust-management",
  "wallets": "wallet"
};
export const profileFolders = [
  "credential-formats",
  "credential-profiles",
  "issuance-protocols",
  "key-managements",
  "presentation-protocols",
  "signing-algorithms",
  "status-algorithms",
  "trust-managements",
];
export function schemaToDataFolder(folder) {
  return Object.keys(folderMapping).find(key => folderMapping[key] === folder);
}

export function dataFolderToSchema(folder) {
  return folderMapping[folder];
}

