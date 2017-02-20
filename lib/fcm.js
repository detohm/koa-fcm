/**
 * koa helper module to interact with Google's Firebase Cloud Messaging (FCM).
 *
 * @author Attaphong Rattanaveerachanon <ohm.attaphong@gmail.com>
 * @link https://github.com/detohm/koa-fcm
 */
var https = require('https');

module.exports = FCM;

function FCM(serverKey){
	if(!(this instanceof FCM)) {
		return new FCM(serverKey);
	}

	this.serverKey = serverKey || "";

	let fcmRequestOptions = {
		host: 'fcm.googleapis.com',
        port: 443,
        path: '/fcm/send',
        method: 'POST'
    };

    let iidRequestOptions = {
    	host: 'iid.googleapis.com',
    	port: 443,
    	path: '/iid/v1/REGISTRATION_TOKEN/rel/topics/TOPIC_NAME',
    	method: 'POST'
    };

    //raw https send method
    this.send = function(httpsRequestOptions, headers, payload){

    	let args = {
    		httpsRequestOptions: httpsRequestOptions,
    		headers: headers,
    		payload: payload
    	};
    	
    	return function(callback){

    		let responseData = "";
    		let httpsRequestOptions = args.httpsRequestOptions;
    		httpsRequestOptions.headers = args.headers;

    		let req = https.request(httpsRequestOptions, (res) => {

    			res.setEncoding('utf8');

    			res.on('data', (chunk) => {
    				responseData += chunk;
    			});

    			res.on('end', () => {
    				callback(null, JSON.parse(responseData));
    			});
    		});

    		if(httpsRequestOptions.method == 'POST'){
    			req.write(JSON.stringify(payload));
    		}

    		req.on('error', (err) => {
    			console.error(err);
    			callback(err, null);
    		});

    		req.end();

    	};
    };

    this.sendSingleDeviceMessage = function(registrationToken , message){
    	
    	let headers = {
    		'Host': fcmRequestOptions.host,
	        'Authorization': 'key=' + serverKey,
	        'Content-Type': 'application/json'
    	};

    	let payload = {
	    	to: registrationToken,
	    	data: message
	    };

    	return this.send(fcmRequestOptions, headers, payload);

    };

    this.sendTopicMessage = function(topicName , message){
    	
    	let headers = {
    		'Host': fcmRequestOptions.host,
	        'Authorization': 'key=' + serverKey,
	        'Content-Type': 'application/json'
    	};

    	let payload = {
	    	to: "/topics/"+topicName,
	    	data: message
	    };

    	return this.send(fcmRequestOptions, headers, payload);

    };

    this.subscribeTopic = function(topicName, registrationToken){
    	let headers = {
    		'Host': iidRequestOptions.host,
	        'Authorization': 'key=' + serverKey,
	        'Content-Type': 'application/json'
    	};

    	let payload = {};

    	var iidRequestModifiedOptions = iidRequestOptions;
    	iidRequestModifiedOptions.path = iidRequestModifiedOptions.path.replace(/REGISTRATION_TOKEN/gi, registrationToken);  
		iidRequestModifiedOptions.path = iidRequestModifiedOptions.path.replace(/TOPIC_NAME/gi, topicName);  

    	return this.send(iidRequestModifiedOptions, headers, payload);

    };
}
