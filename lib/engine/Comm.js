/*	core.js
	2010-10-19
	Carson Christian
	
	Provides the core abstraction layer that talks to the BCS.
*/
/*global BCS, Request, typeOf */
BCS.Comm = {
	$responseCache: {},
	
	read: function (section, key, callback) {
		// PUBLIC
		// Return the requested value for the key in section to the callback function provided
		// Execute BCS.Comm.list('read') for a dictionary of valid sections and keys
		// Note: This method will return cached data if available and the dictionary section is
		// 	defined as cacheable. Cache is cleared on each write operaiton. To force a hard read, use hardRead() instead.
		var readable = this.$readables[section],
			decodeOpts = readable.structure[key],
			controller = this, r, decoded;
			
		if (typeOf(section) !== 'string' || typeOf(key) !== 'string' || typeOf(callback) !== 'function' || !decodeOpts) {
			return null;
		}
		if (readable.cacheable && this.$responseCache[readable.target] !== undefined) {
			decoded = this.decode(this.$responseCache[readable.target], decodeOpts.format, decodeOpts.limits, decodeOpts.join);
			callback.apply(callback, [decoded]);
		} else {
			r = new Request({
				url: 'lib/engine/backend.php',
				data: Object.toQueryString({ location: BCS.$location, target: readable.target, mode: 'get', message: null }),
				method: 'get',
				timeout: 5000,
				onTimeout: function () {
					callback.apply(callback, ['Request timed out.']);
				},
				onSuccess: function (responseText) {
					decoded = controller.decode(responseText, decodeOpts.format, decodeOpts.limits, decodeOpts.join);
					if (readable.cacheable) {
						controller.$responseCache[readable.target] = responseText;
					}
					callback.apply(callback, [decoded]);
				}
			}).send();
		}
	},
	
	hardRead: function (section, key, callback) {
		// PUBLIC
		// Clear the local cache, and then perform a normal read
		delete this.$responseCache[this.$readables[section].target];
		this.read(section, key, callback);
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
	
	write: function (value, section, key) {
		// PUBLIC
		// Write the requested value to the key in section
		// Clears any local cache for section as well
		if (typeOf(value) !== 'string' || typeOf(section) !== 'string' || typeOf(key) !== 'string') {
			return false;
		}
		delete this.$responseCache[this.$readables[section].target];
	},
	
	encode: function () {
		
	}
	
};