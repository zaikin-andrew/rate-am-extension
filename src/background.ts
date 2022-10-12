import { MessageFromServiceWorker } from './app/shared/interfaces/messageFromServiceWorker';

console.log('background.js works');

declare const window: any;

const browser = (function () {
  return window.msBrowser ||
    window.browser ||
    window.chrome;
})();

function sendMessageToGetArticles() {
  browser.runtime.sendMessage({ status: 'GET_ARTICLES' } as MessageFromServiceWorker);
}

function saveToLocalStorageNewDate() {
  const day = new Date();
  localStorage.savedTimestamp = setNextDay(day).getTime();
}

function setNextDay(day: Date) {
  const nextDay = new Date(day);
  nextDay.setDate(day.getDate() + 1);
  nextDay.setHours(10);
  nextDay.setMinutes(0);
  nextDay.setSeconds(0);
  nextDay.setMilliseconds(0);
  return nextDay;
}

function checkTimestamp() {
  if (localStorage.savedTimestamp) {
    let timestamp = parseInt(localStorage.savedTimestamp);
    if (Date.now() >= timestamp) {
      saveToLocalStorageNewDate();
      sendMessageToGetArticles();
    }
  } else {
    saveToLocalStorageNewDate();
    sendMessageToGetArticles();
  }
}

setInterval(checkTimestamp, 60000);
