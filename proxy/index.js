const fetch = require('node-fetch');

exports.handler = async (event) => {

    console.log(event);
    let channel = event.channel;
    let text = event.text;
    let token = event.token;
    let cookie = event.cookie;
    let debug = event.debug || false;

    if (!debug) {
        if (event.isBase64Encoded) {
            const payload = JSON.parse((new Buffer(event.body, 'base64')).toString())
            channel = payload.channel;
            text = payload.text;
            token = payload.token;
            cookie = payload.cookie;
        } else {
            const payload = JSON.parse(event.body)
            channel = payload.channel;
            text = payload.text;
            token = payload.token;
            cookie = payload.cookie;
        }
    }
    console.log(event);
    try {

        const result = await fetch(`https://zig-zaginc.slack.com/api/chat.postMessage?channel=${channel}&as_user=true&text=${text}&pretty=1`, {
            "headers": {
                "accept": "*/*",
                "accept-language": "zh-CN,zh;q=0.9,ja-JP;q=0.8,ja;q=0.7,en;q=0.6,zh-TW;q=0.5",
                "content-type": "multipart/form-data; boundary=----WebKitFormBoundarypu26S7lhRhkOA4vY",
                "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"96\", \"Google Chrome\";v=\"96\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Linux\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site",
                "cookie": cookie
            },
            "referrerPolicy": "no-referrer",
            "body": `------WebKitFormBoundarypu26S7lhRhkOA4vY\r\nContent-Disposition: form-data; name="content"\r\n\r\nnull\r\n------WebKitFormBoundarypu26S7lhRhkOA4vY\r\nContent-Disposition: form-data; name="token"\r\n\r\n${token}\r\n------WebKitFormBoundarypu26S7lhRhkOA4vY--\r\n`,
            "method": "POST"
        });

        return await result.text();
    } catch (error) {
        console.error(error);
    }
};
