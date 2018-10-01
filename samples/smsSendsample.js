const fs = require('fs');
const RedsmsApiSimple = require('../Redsms/RedsmsApiSimple');

const config = JSON.parse(fs.readFileSync('../config.json', 'utf8'));

const login = config['login'];
const apiKey = config['apiKey'];
const testNumber = config['phone'];
const smsSenderName = config['smsSenderName'];

const redsmsApi = new RedsmsApiSimple(login, apiKey);

try {
  let sendResult;
  console.log('Send sms...');
  redsmsApi
    .sendSMS(testNumber, 'It is a test message.', smsSenderName)
    .then(
      res => sendResult = res.body
    );
} catch (e) {
  console.log('--- e', e);
}