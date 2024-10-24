import {config} from 'dotenv';
import fs from 'fs';
import handlebars from 'handlebars';
import { execSync } from 'child_process';
import {createTransport, createTestAccount, getTestMessageUrl} from 'nodemailer'
import Mailjet from 'node-mailjet';

config();

const walletFiles = fs.readdirSync('../wallets');
const walletCounter = walletFiles.length;

const wallets = walletFiles.map(walletFile => {
  const content = JSON.parse(fs.readFileSync(`../wallets/${walletFile}`, 'utf8'));
  content.id = walletFile.slice(0, -5);
  return content;
});

// Get the date range from environment variables
let fromDate = process.env.FROM_DATE;
let untilDate = process.env.UNTIL_DATE;

if (!fromDate || !untilDate) {
  const now = new Date();
  const firstDayOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastDayOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

  fromDate = fromDate || firstDayOfLastMonth.toISOString().split('T')[0];
  untilDate = untilDate || lastDayOfLastMonth.toISOString().split('T')[0];
}

// Get the list of files added in the specified date range
let caseStudyFiles = execSync(`git log --diff-filter=A --since="${fromDate}" --until="${untilDate}" --name-only --pretty=format:`, { encoding: 'utf8' })
  .split('\n')
  .filter(file => file.startsWith('data/case-studies/') && file.endsWith('.json'));

if(process.env.LOCAL) {
  //use all files that are included in the folder
  caseStudyFiles = fs.readdirSync('../case-studies').map(file => `case-studies/${file}`);
}

console.log(`Found ${caseStudyFiles.length} new case ${caseStudyFiles.length === 1 ? 'study' : 'studies'}: ${caseStudyFiles.join(', ')}`);

const url = process.env.LOCATION ?? 'https://openwallet-foundation.github.io/digital-wallet-and-agent-overviews-sig/#';

// format the case studies
const caseStudies = caseStudyFiles.map(caseStudy => {
  const id = caseStudy.split('/')[1].slice(0, -5);
  const content = JSON.parse(fs.readFileSync(`../${caseStudy}`, 'utf8'));
  delete content['$schema'];

  content.wallets = wallets.filter(w =>content.references.includes(w.id)).map(wallet => ({
    name: wallet.name,
    company: wallet.company,
    url: `${url}/wallets/${encodeURIComponent(wallet.id)}`,
    companyUrl: wallet.companyUrl ?? wallet.urlWebsite,
  }))
  content.url = `${url}/case-studies/${encodeURIComponent(id)}`;
  content.hashTags = content.hashTags.map(tag => ({url: `${url}/case-studies?tag=${encodeURIComponent(tag)}`, value: tag}));
  return content;
});

const currentDate = new Date();
currentDate.setMonth(currentDate.getMonth() - 1);
const currentMonthName = currentDate.toLocaleString('default', { month: 'long' });
const templateSource = fs.readFileSync('./scripts/mail-template.hbs', 'utf8');
const subject = `Monthly Wallet and Agent Case Study Newsletter - ${currentMonthName}`;
const preHeader = `${caseStudies.length} new case ${caseStudies.length === 1 ? 'study' : 'studies'} for ${currentMonthName}`;

const template = handlebars.compile(templateSource);
const html = template({ caseStudies, lastMonth: currentMonthName, subject, preHeader, walletCounter });

if(process.env.EMAIL_STORE){
  fs.writeFileSync(`./newsletter.html`, html);
}


function getMailConfig() {
  if(process.env.NODE_ENV === 'production'){
    return Promise.resolve({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }
  else {
    return createTestAccount().then((account) => ({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      }
    }))
  }
}

function sendViaMailJet() {
  const mailjet = new Mailjet({
    apiKey: process.env.MJ_APIKEY_PUBLIC,
    apiSecret: process.env.MJ_APIKEY_PRIVATE
  });

  mailjet.post('send', { version: 'v3.1' }).request({
    Messages: [
      {
        From: {
          Email: "newsletter@walletoverview.info",
          Name: 'Open Wallet Foundation'
        },
        To: [
          {
            Email: "rnlchwv8w@lists.mailjet.com",
          }
        ],
        Subject: subject,
        HTMLPart: html,
        ContactsListID: "10464589" // Specify the contact list ID
      }
    ]
  }).then((result) => console.log(JSON.stringify(result.body, null ,4)))
    .catch((err) => console.log(JSON.stringify(err.response.data, null ,4)));
}

function sendIndividual() {
  const mailjet = new Mailjet({
    apiKey: process.env.MJ_APIKEY_PUBLIC,
    apiSecret: process.env.MJ_APIKEY_PRIVATE
  });

  mailjet.post('send', { version: 'v3.1' }).request({
    Messages: [
      {
        From: {
          Email: "newsletter@walletoverview.info",
          Name: 'Wallet Overview'
        },
        To: [
          {
            Email: process.env.EMAIL_RECIPIENT
          }
        ],
        Subject: subject,
        HTMLPart: html,
      }
    ]
  }).then((result) => console.log(JSON.stringify(result.body, null ,4)))
    .catch((err) => console.log(JSON.stringify(err.response.data, null ,4)));
}

// old approach for owf list
function sendLocal() {
  // Email options
  let mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: process.env.EMAIL_RECIPIENT ?? 'wallet-case-studies-newsletter@lists.openwallet.foundation',
    subject,
    html
  };

  // Send the email
  getMailConfig().then(config => createTransport(config).sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Email sent: ' + info.response);
    if(process.env.NODE_ENV !== 'production') {
      console.log('Preview URL: %s', getTestMessageUrl(info));
    }
  }));
}

if(process.env.EMAIL_RECIPIENT) {
  sendIndividual();
} else if(process.env.MJ_APIKEY_PUBLIC) {
  sendViaMailJet();
} else {
  sendLocal();
}
