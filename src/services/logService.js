import * as Sentry from '@sentry/browser';

function init(){
  Sentry.init({dsn: "https://2c811971b9b249de892e2d034a3e1899@sentry.io/5171065"});
}

function log(error){
  Sentry.captureException(error);
}

export default{
  init,
  log
}