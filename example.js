/**
 * koa helper module to interact with Google's Firebase Cloud Messaging (FCM).
 *
 * @author Attaphong Rattanaveerachanon <ohm.attaphong@gmail.com>
 * @link https://github.com/detohm/koa-fcm
 */
var koa = require('koa');
var FCM = require('./lib/fcm');
 
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