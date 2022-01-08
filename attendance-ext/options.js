'use strict';

const tokenElem = document.getElementById('token');
chrome.storage.local.get(['token'], function(data) {
  tokenElem.value = data.token ?? "";
});

const channelElem = document.getElementById('channel');
chrome.storage.local.get(['channel'], function(data) {
  channelElem.value = data.channel ?? "";
});

const cookieElem = document.getElementById('cookie');
chrome.storage.local.get(['cookie'], function(data) {
  cookieElem.value = data.cookie ?? "";
});

const proxyElem = document.getElementById('proxy');
chrome.storage.local.get(['proxy'], function(data) {
  proxyElem.value = data.proxy ?? "";
});

const buttonClick = function(){
  const button = document.getElementById('config-set');
  button.addEventListener('click', function() {
    chrome.storage.local.set({token: tokenElem.value}, function() {
      console.log('token is ' + tokenElem.value);
    });
    chrome.storage.local.set({channel: channelElem.value}, function() {
      console.log('channel is ' + channelElem.value);
    });
    chrome.storage.local.set({cookie: cookieElem.value}, function() {
      console.log('cookie is ' + cookieElem.value);
    });
    chrome.storage.local.set({proxy: proxyElem.value}, function() {
      console.log('proxy is ' + proxyElem.value);
    });
  });
};
buttonClick();
