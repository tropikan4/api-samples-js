const superagent = require('superagent');
const crypto = require('crypto');

const SMS_TYPE = 'sms';
const VIBER_TYPE = 'viber';
const RESEND_TYPE = 'viber,sms';

const VALIDITY_PERIOD_MIN = 60;
const VALIDITY_PERIOD_MAX = 1440 * 60;

const ksort = obj =>
  Object.keys(obj).sort().reduce((acc, key) => (acc[key] = obj[key], acc), {});

const joinValues = (obj) =>
  Object.values(obj).reduce((acc, value) => acc+ value, '');

class RedsmsApiSimple {
  constructor(login, apiKey, apiUrl = null) {
    this.login = login;
    this.apiKey = apiKey;
    this.apiUrl = apiUrl ? apiUrl : 'https://cp.redsms.ru/api';
  }

  clientInfo() {
    const methodUrl = 'client/info';
    return this.sendGet(methodUrl);
  }

  deleteFile(idFile) {
    const methodUrl = `storage/${idFile}`;
    return this.sendDelete(methodUrl);
  }

  fileInfo() {
    const methodUrl = 'storage';
    return this.sendGet(methodUrl);
  }

  uploadFile(fileNAME) {
    const methodUrl = `${this.apiUrl}/storage`;
    // return this.postFile(methodUrl, fileNAME);

    return superagent
      .post(methodUrl)
      .attach('theFile', fileNAME);
  }



  sendSMS(to, text, from, route = SMS_TYPE)
  {
    const methodUrl = `${this.apiUrl}/message`;
    to = Array.isArray(to) ? to : [to];
    const data = {
      to: to.join(','),
      text: text,
      from: from,
      route: route
    };
    return this.sendPost(methodUrl, data);
  }

  sendViber(to, text, from, btnText, btnUrl, imageUrl) {
    const methodUrl = 'message';
    const to = Array.isArray(to) ? to : [to];
    const data = {
      'to': to.join(','),
      'text': text,
      'from': from,
      'route': VIBER_TYPE,
      'viber.btnText': btnText,
      'viber.btnUrl': btnUrl,
      'viber.imageUrl': imageUrl
    };

    return this.sendPost(methodUrl, data);
  }

  sendMessage(data) {
    const methodUrl = 'message';
    return this.sendPost(methodUrl, data);
  }

  messageInfo(uuid) {
    const methodUrl = 'message/'.uuid;
    return this.sendGet(methodUrl);
  }

  senderNameList(data = []) {
    const methodUrl = 'sender-name';
    return this.sendGet(methodUrl, data);
  }

  getSenderName(id, data = []) {
    const methodUrl = `sender-name/${id}`;
    return this.sendGet(methodUrl, data);
  }

  createDispatch(data = [], methodUrl = 'dispatch') {
    return this.sendPost(methodUrl, data);
  }

  getDispatch(id, data = []) {
    const methodUrl = `dispatch/'${id}`;
    this.sendGet(methodUrl, data);
  }

  getDispatchList(data = []) {
    const methodUrl = 'dispatch';
    return this.sendGet(methodUrl, data);
  }

  pauseDispatch(id, data = []) {
    const methodUrl = `dispatch/${id}/pause`;
    return this.sendGet(methodUrl, data);
  }

  resumeDispatch(id, data = []) {
    const methodUrl = `dispatch/${id}/resume`;
    return this.sendGet(methodUrl, data);
  }

  cancelDispatch(id, data = []) {
    const methodUrl = `dispatch/${id}/cancel`;
    return this.sendGet(methodUrl, data);
  }

  sendGet(url, data = []) {
    superagent
      .get(url)
      .query(data)
      .then(
        (res) => console.log('--- res', res),
        (err) => console.log('--- err', err)
      )
  }

  sendPost(url, data = []) {
    let result = '';
    return superagent
      .post(url)
      .set(this.getHeaders(data))
      .send(data)
  }

  getHeaders(data = []) {
    data = ksort(data);
    const ts = Math.random() * 10000;
    return {
      login: this.login,
      ts: ts,
      sig: crypto
        .createHash('md5')
        .update(`${joinValues(data)}${ts}${this.apiKey}`)
        .digest('hex')
    }
  }
}

module.exports = RedsmsApiSimple;