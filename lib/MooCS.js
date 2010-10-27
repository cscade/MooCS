/*	MooCS.js
	"Mooks": 
	2010-10-19
	Carson S. Christian
	cchristian@moocsinterface.net
	
	Provides the MooCS namespace, and the MooCS.Device instance generator.
*/
/*
	This work is licensed under the Creative Commons Attribution-ShareAlike 3.0 Unported License.
	To view a copy of this license, visit http://creativecommons.org/licenses/by-sa/3.0/
	or send a letter to Creative Commons, 171 Second Street, Suite 300, San Francisco, California, 94105, USA.
*/
	

/*global */

MooCS = {
	$libraryVersion: '0.1-dev'
};

MooCS.Device = new Class({
	$responseCache: {},
	$requestQueue: [],
	$reading: false,
	
	initialize: function (location) {
		this.location = location;
	},
	
	read: function (section, key, callback) {
		// PUBLIC
		// Return the requested value for the key in section to the callback function provided
		// Execute this.list('read') for a dictionary of valid sections and keys
		// Note: This method will return cached data if available and the dictionary section is
		// 	defined as cacheable. Cache is cleared on each write operation to that section. To force a hard read, use hardRead() instead.
		var controller = this;
		
		this.$requestQueue.push(function () {
			controller.performRead(section, key, callback);
		});
		if (this.$reading === false) {
			this.$reading = true;
			this.$requestQueue.shift().apply(this);
		}
	},
	
	hardRead: function (section, key, callback) {
		// PUBLIC
		// Clear the local cache, and then perform a normal read
		delete this.$responseCache[MooCS.$readables[section].target];
		this.read(section, key, callback);
	},
	
	performRead: function (section, key, callback) {
		// PRIVATE
		// This method is called by read()
		var readable = MooCS.$readables[section],
			decodeOpts = readable.structure[key],
			controller = this,
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
				data: Object.toQueryString({ location: this.location, target: readable.target, mode: 'get', message: null }),
				method: 'get',
				timeout: 5000,
				onTimeout: function () {
					decoded = controller.decode('Request timed out.', decodeOpts);
					callback.apply(callback, [decoded]);
					controller.nextQueue();
				},
				onSuccess: function (responseText) {
					decoded = controller.decode(responseText, decodeOpts);
					if (readable.cacheable) {
						controller.$responseCache[readable.target] = responseText;
					}
					callback.apply(callback, [decoded]);
					controller.nextQueue();
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
				} else if (options.encoding === 'multiple-choice') {
					result = options.choices[segments.slice(options.limits[0], options.limits[0] + 1)[0]];
				}
			} else {
				result = segments.slice(options.limits[0], (options.limits[1] || options.limits[0]) + 1).join(options.join);
			}
		} else if (options.format === 'number') {
			if (options.encoding) {
				if (options.encoding === 'fahrenheit-10') {
					result = Number.from(segments.slice(options.limits[0], options.limits[0] + 1)) / 10;
				}
			} else {
				result = Number.from(segments.slice(options.limits[0], options.limits[0] + 1));
			}
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
		delete this.$responseCache[MooCS.$readables[section].target];
	},
	
	encode: function () {
		
	},
	
	nextQueue: function () {
		// PRIVATE
		// Execute the next request in the queue, if any
		if (this.$requestQueue.length > 0) {
			this.$requestQueue.shift().apply(this);
		} else {
			this.$reading = false;
		}
	}
});