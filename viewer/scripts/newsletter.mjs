import {config} from 'dotenv';
import fs from 'fs';
import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import { execSync } from 'child_process';

config();

const walletFiles = fs.readdirSync('../wallets');
const walletCounter = walletFiles.length;

const wallets = walletFiles.map(walletFile => {
  const content = JSON.parse(fs.readFileSync(`../wallets/${walletFile}`, 'utf8'));
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

// format the case studies
const caseStudies = caseStudyFiles.map(caseStudy => {
  const content = JSON.parse(fs.readFileSync(`../${caseStudy}`, 'utf8'));
  delete content['$schema'];
  const wallet = wallets.find(w => w.name === content.reference);
  content.company = wallet.company;
  content.companyUrl = wallet.companyUrl ?? wallet.urlWeb;
  content.reference = wallet.name;
  content.referenceUrl = `https://openwallet-foundation.github.io/digital-wallet-and-agent-overviews-sig/#/${encodeURIComponent(wallet.name)}`;
  return content;
});

const currentMonthName = new Date().toLocaleString('default', { month: 'long' });
const templateSource = fs.readFileSync('./scripts/mail-template.hbs', 'utf8');
const subject = `Monthly Wallet Case Study Newsletter - ${currentMonthName}`;
const preHeader = `We got ${caseStudies.length} new case ${caseStudies.length === 1 ? 'study' : 'studies'}`;

const template = handlebars.compile(templateSource);
const html = template({ caseStudies, lastMonth: currentMonthName, subject, preHeader, walletCounter });


// Create a transporter
let transporter = nodemailer.createTransport({
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
