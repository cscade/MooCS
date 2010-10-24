/*	core.js
	2010-10-19
	Carson Christian
	
	Provides the core abstraction layer that talks to the BCS.
*/
/*global BCS, Request, typeOf */
BCS.Comm = {
	$responseCache: {},
	$requestQueue: [],
	$reading: false,
	
	read: function (section, key, callback) {
		// PUBLIC
		// Return the requested value for the key in section to the callback function provided
		// Execute BCS.Comm.list('read') for a dictionary of valid sections and keys
		// Note: This method will return cached data if available and the dictionary section is
		// 	defined as cacheable. Cache is cleared on each write operation to that section. To force a hard read, use hardRead() instead.
		this.$requestQueue.push(function () {
			BCS.Comm.performRead(section, key, callback);
		});
		if (this.$reading === false) {
			this.$reading = true;
			this.$requestQueue.shift().apply(this);
		}
	},
	
	hardRead: function (section, key, callback) {
		// PUBLIC
		// Clear the local cache, and then perform a normal read
		delete this.$responseCache[this.$readables[section].target];
		this.read(section, key, callback);
	},
	
	performRead: function (section, key, callback) {
		// PRIVATE
		// This method is called by read()
		var readable = this.$readables[section],
			decodeOpts = readable.structure[key],
			r, decoded;
			
		if (typeOf(section) !== 'string' || typeOf(key) !== 'string' || typeOf(callback) !== 'function' || !decodeOpts) {
			return null;
		}
		if (readable.cacheable && this.$responseCache[readable.target] !== undefined) {
			decoded = this.decode(this.$responseCache[readable.target], decodeOpts);
			callback.apply(callback, [decoded]);
			this.nextQueue();
		} else {
			r = new Request({
				url: 'lib/engine/backend.php',
				data: Object.toQueryString({ location: BCS.$location, target: readable.target, mode: 'get', message: null }),
				method: 'get',
				timeout: 5000,
				onTimeout: function () {
					decoded = BCS.Comm.decode('Request timed out.', decodeOpts);
					callback.apply(callback, [decoded]);
					BCS.Comm.nextQueue();
				},
				onSuccess: function (responseText) {
					decoded = BCS.Comm.decode(responseText, decodeOpts);
					if (readable.cacheable) {
						BCS.Comm.$responseCache[readable.target] = responseText;
					}
					callback.apply(callback, [decoded]);
					BCS.Comm.nextQueue();
				}
			}).send();
		}
	},
	
	decode: function (raw, options) {
		// PRIVATE
		// Return the raw value broken down at limits in the 'to' format, using the requested 'using' string if needed
		// Resturns null on a failed decode
		var segments = raw.split(','),
			result = null, temp;
		
		if (typeOf(raw) !== 'string') {
			return null;
		}
		if (raw === 'Request timed out.') {
			// With the exception of string, we will return types that intentionally mismatch the target format, so they can be checked.
			if (options.format === 'string') {
				return raw;
			} else if (options.format === 'number') {
				return NaN;
			} else if (options.format === 'boolean') {
				return null;
			}
		}
		if (options.format === 'string') {
			if (options.encoding) {
				if (options.encoding === 'hex') {
					result = segments.slice(options.limits[0], (options.limits[1] || options.limits[0]) + 1).map(function (s) {
						var hex = Number.from(s).toString(16);

						if (hex.length < 2) {
							hex = '0' + hex;
						}
						return hex;
					}).join(options.join);
				}
			} else {
				result = segments.slice(options.limits[0], (options.limits[1] || options.limits[0]) + 1).join(options.join);
			}
		} else if (options.format === 'number') {
			result = Number.from(segments.slice(options.limits[0], options.limits[0] + 1));
		} else if (options.format === 'boolean') {
			if (options.encoding) {
				if (options.encoding === 'binary') {
					temp = Number.from(segments.slice(options.limits[0], options.limits[0] + 1)[0]).toString(2);
					if (options.position > temp.length - 1) {
						// The resulting binary string is too short, therefore this position is false
						result = false;
					} else {
						result = (temp[temp.length - (options.position + 1)] === '1') ? true : false;
					}
				}
			} else {
				result = (segments.slice(options.limits[0], options.limits[0] + 1)[0] === '1' ? true : false);
			}
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
		
	},
	
	nextQueue: function () {
		// PRIVATE
		// Execute the next request in the queue, if any
		if (BCS.Comm.$requestQueue.length > 0) {
			BCS.Comm.$requestQueue.shift().apply(BCS.Comm);
		} else {
			BCS.Comm.$reading = false;
		}
	}
	
};