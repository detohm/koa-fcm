var koa = require('koa');
var FCM = require('./lib/fcm');
 
var app = koa();
 
app.use(function *() {
 
    var fcm = FCM('PUT YOUR SERVER KEY');

    //payload for sending message for single subscriber.
    var payload = {
    	to:"CLIENT TOKEN"
		,
		//this data can be manipulated based on usage.
    	data: { 
	        url: 'xx',
	        test: 'test'
	    }
    };

    try{
        var response = yield fcm.send(payload);
        console.log({response: response});
    }
    catch(err) {
        console.log({err: err});
    }
});
 
app.listen(process.env.PORT || 8070);