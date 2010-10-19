/*	core.js
	2010-10-19
	Carson Christian
	
	Provides the core abstraction layer that talks to the BCS.
*/
/*global Class */
BCS.Core = {
	$readables: {
		ethernet: 'ipaddr.dat'
	},
	$writables: {
		ethernet: 'ipaddr.dat'
	},
	
	read: function () {
		
	},
	
	write: function () {
		
	},
	
	decode: function () {
		
	},
	
	encode: function () {
		
	},
	
	talk: function (mode, target, message, receiver) {
		// PRIVATE
		// Communicate the message to the target using mode. Respond to the receiver.
		var r = new Request({
			url: 'lib/backend.php',
			data: Object.toQueryString({ location: BCS.$location, target: target, mode: mode, message: message }),
			method: 'get',
			timeout: 5000,
			onTimeout: function () {
				console.log('Request timed out.');
			},
			onSuccess: function (responseText) {
				receiver.apply(receiver, [responseText]);
			}
		}).send();
	}
	
};