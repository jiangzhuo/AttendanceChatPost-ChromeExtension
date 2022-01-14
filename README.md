# AttendanceChatPost-ChromeExtension
Chrome extension for attendance chat post with `https://biz.moneyforward.com/attendance`.


## Overview
[マネーフォワードクラウド勤怠](https://biz.moneyforward.com/attendance) のホーム画面にある出勤・退勤等の打刻のアクションでチャットツールに投稿を行うGoogleChrome拡張機能です。

以下の環境で確認しています。
- [Google Chrome] バージョン: 96


## Install
Chromeウェブストアに公開していないため、手動でインストールを行ってください。

1. Git checkout this project to your local
2. Load this extension in Chrome, through `Load unpacked`

参考
- https://developer.chrome.com/extensions/getstarted
- https://toranoana-lab.hatenablog.com/entry/2020/04/23/174421


## 使い方
- Chrome拡張機能のオプションでチャットツールの設定を行ってください。
- 事前にチャットツール側で You need create a proxy for send slack message. You can use a lambda function as proxy.
- The lambda code is [here](https://github.com/jiangzhuo/AttendanceChatPost-ChromeExtension/tree/master/proxy), you need deploy it to AWS and create a API Gateway for it.
- If you do not know how to setup the proxy, you can ask me on Slack.
- You need prepare the cookie and token of you slack, you can get these information in Slack web client, open the Chrome Dev Tool -> Network -> Find some slack API request -> Copy the cookie header value and token value

- [マネーフォワードクラウド勤怠](https://biz.moneyforward.com/attendance) のホーム画面で打刻のアクション（クリック）を行うとチャットツールのチャンネルにPOSTされます。


## 動作するURLの設定
以下の箇所で指定しています。
- [background.js](https://github.com/sakasa/AttendanceChatPost-ChromeExtension/blob/master/attendance-ext/background.js) ・・・ Chrome拡張機能を動作させるURLの設定
```javascript
pageUrl: {
  hostEquals: 'attendance.moneyforward.com',
  pathEquals: '/my_page'
},
```

- [manifest.json](https://github.com/sakasa/AttendanceChatPost-ChromeExtension/blob/master/attendance-ext/manifest.json) ・・・ [contentScript.js](https://github.com/sakasa/AttendanceChatPost-ChromeExtension/blob/master/attendance-ext/contentScript.js) を動作させるURLの設定
```json
"content_scripts": [
  {
    "matches": ["https://attendance.moneyforward.com/my_page"],
    "js": ["contentScript.js"]
  }
],
```


## その他
Chrome拡張機能のオプションページとポップアップページのcssに [Bootstrap5](https://v5.getbootstrap.jp/docs/5.0/migration/) を使っています。
```html
<!-- Bootstrap CSS -->
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/css/bootstrap.min.css" integrity="sha384-r4NyP46KrjDleawBgD5tp8Y7UzmLA05oM1iAEQ17CSuDqnUK2+k9luXQOfXJCJ4I" crossorigin="anonymous">
```
バージョンがAlphaなので突然画面が崩れたりするかもしれません。

## Blog
https://note.com/ppiicckkllees/n/n97674a7bf2a1

