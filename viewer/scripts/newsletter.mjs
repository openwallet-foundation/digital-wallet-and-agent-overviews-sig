import {config} from 'dotenv';
import fs from 'fs';
import handlebars from 'handlebars';
import { execSync } from 'child_process';
import {Client} from '@sendgrid/client';
import {createTransport} from 'nodemailer'

config();

const service = new Client();

service.setApiKey(process.env.SENDGRID_API_KEY);


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
const caseStudyFiles = execSync(`git log --diff-filter=A --since="${fromDate}" --until="${untilDate}" --name-only --pretty=format:`, { encoding: 'utf8' })
  .split('\n')
  .filter(file => file.startsWith('case-studies/') && file.endsWith('.json'));

console.log(`Found ${caseStudyFiles.length} new case ${caseStudyFiles.length === 1 ? 'study' : 'studies'}: ${caseStudyFiles.join(', ')}`);

//const url = 'https://openwallet-foundation.github.io/digital-wallet-and-agent-overviews-sig/#';
const url = 'http://localhost:4200/#';

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
  return content;
});

const currentMonthName = new Date().toLocaleString('default', { month: 'long' });
const templateSource = fs.readFileSync('./scripts/mail-template.hbs', 'utf8');
const subject = `Monthly Wallet Case Study Newsletter - ${currentMonthName}`;
const preHeader = `We got ${caseStudies.length} new case ${caseStudies.length === 1 ? 'study' : 'studies'}`;

const template = handlebars.compile(templateSource);
const html = template({ caseStudies, lastMonth: currentMonthName, subject, preHeader, walletCounter });


//when using nodemail
// Create a transporter
let transporter = createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Email options
let mailOptions = {
  from: process.env.EMAIL_ADDRESS,
  to: 'wallet-case-studies-newsletter@lists.openwallet.foundation',
  subject,
  html
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error);
  }
  console.log('Email sent: ' + info.response);
});

/* const request = {
  url: `/v3/verified_senders`,
  method: 'GET',

}
service.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
  .catch(error => {
    console.error(error);
  }); */

// use sendgrid
/* const listId = "d88713fd-1c3d-427a-8761-004b38e7a6c3";
const senderId = 6190879;
service.request({
  url: `/v3/marketing/singlesends`,
  method: 'POST',
  body: {
    name: "Monthly Case Study Overview", // Name for your campaign
    send_to: {
      list_ids: [listId], // Array of contact list IDs
      all: false, // If true, it sends to all contacts
    },
    email_config: {
      sender_id: senderId, // Sender ID, should be a verified sender in SendGrid
      html_content: html,
      subject,
      send_at: 'now',
      suppression_group_id: 180616,
    },
  },
}).then(res => console.log(res), (err) => console.log(err.response.body));
 */
