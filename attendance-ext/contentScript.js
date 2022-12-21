const datetime = function(){
    // const dateStr = document.getElementsByName('web_time_recorder_form[date]')[0].value;
    // const timeStr = document.getElementsByName('web_time_recorder_form[user_time]')[0].value;
    const timeStr = (new Date()).toLocaleString();
    //return '[' +  dateStr + ' ' + timeStr + ']';
    return '[' + timeStr + ']';
};
console.log(datetime());

const user = document.getElementsByClassName("attendance-header-user-name")[0].firstChild.innerText.split(" ")[0];
console.log(user);

let chatConf = {};
const load = function(){
    chrome.storage.local.get(['token'], function(data) {
        chatConf.token = data.token;
    });
    chrome.storage.local.get(['channel'], function(data) {
        chatConf.channel = data.channel;
    });
    chrome.storage.local.get(['cookie'], function(data) {
        chatConf.cookie = data.cookie;
    });
    chrome.storage.local.get(['proxy'], function(data) {
        chatConf.proxy = data.proxy;
    });
};
load();

function postChat(text){
    console.log(text);
    fetch(chatConf.proxy, {
        "method": "POST",
        "body": JSON.stringify({
            "token": chatConf.token,
            "text": `${user}-${datetime()}-${text}`,
            "channel": chatConf.channel,
            "cookie": chatConf.cookie
        })
    }).then(res => res.json()).then(console.log).catch(console.error)
}

// const timeStampButtons = document.getElementsByClassName('attendance-card-title');
const timeStampButtons = [document.querySelectorAll('div.clock_in > button')[0],document.querySelectorAll('div.clock_out > button')[0]]
for(let i=0;i<timeStampButtons.length; i++){
    const element = timeStampButtons[i];
    element.addEventListener('click', function(evt){
        postChat(element.innerText);
    });
    console.log('buttons added listener');
}

chrome.storage.onChanged.addListener(function(changes, namespace) {
    for (let key in changes) {
      let storageChange = changes[key];
      console.log('Storage key "%s" in namespace "%s" changed. ' +
                  'Old value was "%s", new value is "%s".',
                  key,
                  namespace,
                  storageChange.oldValue,
                  storageChange.newValue);
    }
    load();
});
