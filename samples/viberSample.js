const fs = require('fs');
const { RedsmsApiSimple, VIBER_TYPE } = require('../Redsms/RedsmsApiSimple');

console.log('--- VIBER_TYPE', VIBER_TYPE);

const config = JSON.parse(fs.readFileSync('../config.json', 'utf8'));

const login = config['login'];
const apiKey = config['apiKey'];
const testNumber = config['phone'];
const smsSenderName = config['smsSenderName'];
const viberSenderName = config['viberSenderName'];


const redsmsApi = new RedsmsApiSimple(login, apiKey);

try {
  let sendResult;
  console.log('Send viber message...');
  const path = '../data/image/REDSMS.png';
  // const files = redsmsApi.uploadFile(path);
  redsmsApi
    .uploadFile(path)
    .then(
      res => {
        const file = res.body.items.shift();
        const buttonText = 'Кнопка';
        const buttonUrl = 'https://cp.redsms.ru/';
        const textViber = 'Тестовое сообщение';
        const imageUrl = file ? file['url'] : '';
        
        const data = {
          'to': testNumber,
          'text': textViber,
          'from': viberSenderName,
          'route': VIBER_TYPE,
          'viber.btnText': buttonText,
          'viber.btnUrl': buttonUrl,
          'viber.imageUrl': imageUrl,
        };
      },
      err => console.log('--- err', err)
    )
    .then(
      res => console.log('--- res', res),
      err => console.log('--- err', err)
    );
  
} catch (e) {
  console.log('--- e', e);
}