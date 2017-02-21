koa-fcm
===========

Very simple koa helper module to interact with Google's Firebase Cloud Messaging (FCM).
The yield-able api call for using in koa middleware.

## Install
```
npm install --save koa-fcm
```

##Usage
Require koa first.

Simple example using koa-fcm in koa:

```js
var koa = require('koa');
var FCM = require('koa-fcm');
 
var app = koa();
 
app.use(function *() {
 
    var fcm = FCM('YOUR SERVER KEY');
    var regToken = 'REGISTRATION TOKEN FROM CLIENT';
    

    var message = {
        title: "test simple message",
        url: "http://www.dummy.com"
    }

    //SINGLE DEVICE MESSAGGING

    //example to send the message per single registration token
    try{        
        var response = yield fcm.sendSingleDeviceMessage(regToken, message);
        console.log(response);
    }
    catch(err) {
        console.error(err);
    }




    //BROADCAST MESSAGE VIA TOPIC

    //example to subscribe the registration token to the specified topic name 'testtopic'
    try{
        var response = yield fcm.subscribeTopic('testtopic', regToken);
        console.log(response);

    }
    catch(err) {
        console.error(err);
    }

    //example to broadcast message to all subscribers in topic name 'testtopic'
    try{
        var response = yield fcm.sendTopicMessage('testtopic', message);
        console.log(response);

    }
    catch(err) {
        console.error(err);
    }

});

app.listen(process.env.PORT || 8070);
```

## License

MIT