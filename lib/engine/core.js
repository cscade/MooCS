/*	core.js
	2010-10-19
	Carson Christian
	
	Provides the core abstraction layer that talks to the BCS.
*/
/*global BCS, Request, typeOf */
BCS.Core = {
	read: function (section, key) {
		// PUBLIC
		// Return the requested value for the key in section
		var readable = this.$readables[section],
			decodeOpts = readable.structure[key];
			
		if (!decodeOpts) {
			return null;
		}
		
		this.talk('get', readable.target, null, this.decode, [decodeOpts.format, decodeOpts.limits, decodeOpts.join]);
	},
	
	write: function () {
		
	},
	
	decode: function (raw, to, limits, using, receiver, receiverArgs) {
		// PRIVATE
		// Return the raw value broken down at limits in the 'to' format, using the requested 'using' string if needed
		// Resturns null on a failed decode
		var segments = raw.split(','),
			result = null;
		
		if (typeOf(raw) !== 'string') {
			return null;
		}
		if (to === 'string') {
			result = segments.slice(limits[0], (limits[1] || limits[0]) + 1).join(using);
		} else if (to === 'boolean') {
			result = (segments.slice(limits[0], limits[0] + 1)[0] === '1' ? true : false);
		} else if (to === 'hex') {
			result = segments.slice(limits[0], (limits[1] || limits[0]) + 1).map(function (s) {
				var hex = Number.from(s).toString(16);
				
				if (hex.length < 2) {
					hex = '0' + hex;
				}
				return hex;
			}).join(using);
		}
		// return result;
		console.log(result);
	},
	
	encode: function () {
		
	},
	
	talk: function (mode, target, message, receiver, receiverArgs) {
		// PRIVATE
		// Communicate the message to the target using mode. Respond to the receiver.
		var r = new Request({
				url: 'lib/engine/backend.php',
				data: Object.toQueryString({ location: BCS.$location, target: target, mode: mode, message: message }),
				method: 'get',
				timeout: 5000,
				onTimeout: function () {
					console.log('Request timed out.');
				},
				onSuccess: function (responseText) {
					if (typeOf(receiver) === 'function') {
						receiver.apply(receiver, [responseText].append(receiverArgs));
					}
				}
			}).send();
	}
	
};