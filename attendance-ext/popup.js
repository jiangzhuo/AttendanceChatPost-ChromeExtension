'use strict';

const tokenElem = document.getElementById('token');
chrome.storage.local.get(['token'], function(data) {
  tokenElem.innerText = data.token ?? "";
});

const channelElem = document.getElementById('channel');
chrome.storage.local.get(['channel'], function(data) {
  channelElem.innerText = data.channel ?? "";
});

const cookieElem = document.getElementById('cookie');
chrome.storage.local.get(['cookie'], function(data) {
  cookieElem.innerText = data.cookie ?? "";
});

const proxyElem = document.getElementById('proxy');
chrome.storage.local.get(['proxy'], function(data) {
  proxyElem.innerText = data.proxy ?? "";
});
