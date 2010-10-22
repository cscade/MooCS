/*	core.js
	2010-10-19
	Carson Christian
	
	Provides the core abstraction layer that talks to the BCS.
*/
/*global BCS, Request, typeOf */
BCS.Core = {
	read: function (section, key, callback) {
		// PUBLIC
		// Return the requested value for the key in section to the callback function provided
		// Execute BCS.Core.list('read') for a dictionary of valid sections and keys
		var readable = this.$readables[section],
			decodeOpts = readable.structure[key],
			controller = this, r;
			
		if (!decodeOpts || typeOf(callback) !== 'function') {
			return null;
		}
		
		r = new Request({
			url: 'lib/engine/backend.php',
			data: Object.toQueryString({ location: BCS.$location, target: readable.target, mode: 'get', message: null }),
			method: 'get',
			timeout: 5000,
			onTimeout: function () {
				callback.apply(callback, ['Request timed out.']);
			},
			onSuccess: function (responseText) {
				var decoded = controller.decode(responseText, decodeOpts.format, decodeOpts.limits, decodeOpts.join);
				
				callback.apply(callback, [decoded]);
			}
		}).send();
	},
	
	decode: function (raw, to, limits, using) {
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
		return result;
	},
	
	write: function () {
		
	},
	
	encode: function () {
		
	}
	
};