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

	this.serverKey = serverKey || {};

	let httpsOptions = {
		host: 'fcm.googleapis.com',
        port: 443,
        path: '/fcm/send',
        method: 'POST'
    };

    let iidOptions = {
    	host: 'iid.googleapis.com',
    	port: 443,
    	path: '/iid/v1/REGISTRATION_TOKEN/rel/topics/TOPIC_NAME',
    	method: 'POST'
    };


    this.send = function(payload){

    	return function(callback){
    		var data = "";
    		var headers = {
		        'Host': httpsOptions.host,
		        'Authorization': 'key=' + serverKey,
		        'Content-Type': 'application/json'
		    };

		   	httpsOptions.headers = headers;
		   	var req = https.request(httpsOptions, (res) => {
				
				res.setEncoding('utf8');

				res.on('data', (d) => {
					data += d;
				});

				res.on('end', () => {
					callback(null, JSON.parse(data));
				});
			});
		   	req.write(JSON.stringify(payload));
			req.on('error', (e) => {
				console.error(e);
			});
			
			req.end();
    	}
    };
    /*
		@option {
			registrationToken: String,
			topicName: String
		}
    */
    this.subscribeTopic = function(options){
    	return function(callback){
    		var data = "";
    		var headers = {
		        'Host': iidOptions.host,
		        'Authorization': 'key=' + serverKey,
		        'Content-Type': 'application/json'
		    };

		   	iidOptions.headers = headers;

		   	iidOptions.path = iidOptions.path.replace(/REGISTRATION_TOKEN/gi, options.registrationToken);  
			iidOptions.path = iidOptions.path.replace(/TOPIC_NAME/gi, options.topicName);  
			console.log(iidOptions);
		   	var req = https.request(iidOptions, (res) => {
				
				res.setEncoding('utf8');

				res.on('data', (d) => {
					data += d;
				});

				res.on('end', () => {
					callback(null, JSON.parse(data));
				});
			});
		   	req.on('error', (e) => {
				console.error(e);
			});
			
			req.end();
    	}
    };


    this.sendTopicMessage = function(payload){
    	return function(callback){
    		var data = "";
    		var headers = {
		        'Host': httpsOptions.host,
		        'Authorization': 'key=' + serverKey,
		        'Content-Type': 'application/json'
		    };

		   	httpsOptions.headers = headers;
		   	var req = https.request(httpsOptions, (res) => {
				
				res.setEncoding('utf8');

				res.on('data', (d) => {
					data += d;
				});

				res.on('end', () => {
					callback(null, JSON.parse(data));
				});
			});
		   	req.write(JSON.stringify(payload));
			req.on('error', (e) => {
				console.error(e);
			});
			
			req.end();
    	}
    };




}
