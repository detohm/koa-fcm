/**
 * koa helper module to interact with Google's Firebase Cloud Messaging (FCM).
 *
 * @author Attaphong Rattanaveerachanon <ohm.attaphong@gmail.com>
 * @link https://github.com/detohm/koa-fcm
 */
var https = require('https');

module.exports = FCM;

function FCM(opt){
	if(!(this instanceof FCM)) {
		return new FCM(opt);
	}

	this.opts = opts || {};
	this.payload = {};

}
