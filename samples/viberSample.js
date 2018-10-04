const fs = require('fs');
const { RedsmsApiSimple, VIBER_TYPE } = require('../Redsms/RedsmsApiSimple');

const config = JSON.parse(fs.readFileSync('../config.json', 'utf8'));

const login = config['login'];
const apiKey = config['apiKey'];
const testNumber = config['phone'];
const smsSenderName = config['smsSenderName'];
const viberSenderName = config['viberSenderName'];


const redsmsApi = new RedsmsApiSimple(login, apiKey);

try {
  console.log('Send viber message...');
  const path = '../data/image/REDSMS.png';
  redsmsApi
    .uploadFile(path)
    .then(
      res => {
        const file = res.body.items.shift();
        const data = {
          'to': testNumber,
          'text': 'Тестовое сообщение',
          'from': viberSenderName,
          'route': VIBER_TYPE,
          'viber.btnText': 'Кнопка',
          'viber.btnUrl': 'https://cp.redsms.ru/',
          'viber.imageUrl': file ? file['url'] : '',
        };
        return redsmsApi.sendMessage(data);
      },
      err => console.error('--- err', err)
    )
    .then(
      res => console.log('--- res', res),
      err => console.error('--- err', err)
    );
  
} catch (e) {
  console.log('--- e', e);
}