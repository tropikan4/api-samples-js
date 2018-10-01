const SMS_TYPE = 'sms';
const VIBER_TYPE = 'viber';
const RESEND_TYPE = 'viber,sms';

const VALIDITY_PERIOD_MIN = 60;
const VALIDITY_PERIOD_MAX = 1440 * 60;

module.exports = {
  SMS_TYPE,
  VIBER_TYPE,
  RESEND_TYPE,
  VALIDITY_PERIOD_MIN,
  VALIDITY_PERIOD_MAX
};