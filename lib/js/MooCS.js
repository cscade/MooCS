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
/*global $$, MooCS, Element, Class, Request, typeOf, JSChart */
MooCS = {
	$libraryVersion: '0.2-dev',
	$instances: {}
};

MooCS.Device = new Class({
	BCS460: false,
	BCS462: false,
	dictionary: {
		// Initial read dictionary for device detection only
		system: {
			model: {
				target: 'ucsysio.dat',
				limits: [35],
				format: 'string',
				encoding: 'multiple-choice',
				choices: {
					0: 'BCS-460',
					2: 'BCS-462'
				}
			}
		}
	},
	responseCache: {},
	requestQueue: [],
	pollQueue: [],
	reading: false,
	polling: false,
	
	initialize: function (alias, location, startup) {
		var controller = this;
		
		this.name = alias;
		this.location = location;
		this.read('system', 'model', function (r) {
			// r = 'BCS-462';
			if (r === 'BCS-460') {
				controller.BCS460 = true;
				Object.merge(controller.dictionary, MooCS.Dictionary['460']);
			} else if (r === 'BCS-462') {
				controller.BCS462 = true;
				Object.merge(controller.dictionary,  MooCS.Dictionary['460'],  MooCS.Dictionary['462']);
			} else {
				// Unsupported controller
				alert('"' + controller.name + '" could not be contacted or controller detection returned an unknown controller type.\n\nCheck your network connectivity and verify that you are using a compatible controller model.');
				return;
			}
			if (typeOf(startup) === 'function') {
				startup.apply(controller);
			}
		});
		// Cache update listeners
		this.listeners = {};
		// Poller instance
		this.pollers = {};
		// Store instance reference
		MooCS.$instances[String.uniqueID()] = this;
	},
	
	getCapabilities: function () {
		// PUBLIC
		// Return an Object of the valid dictionary entries for read or write on this device.
		// Object format is:
		// 	{ section: [key, key, key, ...] }
		var result = {};

		Object.each(this.dictionary, function (members, key) {
			var what = [];

			result[key] = what;
			Object.each(members, function (detail, key) {
				what.push(key);
			});
		});
		return result;
	},
	
	read: function (section, key, callback, notify) {
		// PUBLIC
		// Return the requested value for the key in section to the callback function provided.
		// Execute this.getCapabilities() for a dictionary of valid sections and keys.
		// notify:
		// 	If notify is true, an update listener will automatically be added using the callback function provided.
		// 	In that case, callback will execute every time the cached data changes.
		// Note: This method will return cached data if available and the dictionary section is
		// 	defined as cacheable. Cache is cleared on each write operation to that section. To force a hard read, use hardRead() instead.
		var controller = this;
		
		if (this.dictionary[section] === undefined || this.dictionary[section][key] === undefined || typeOf(callback) !== 'function') {
			return false;
		}		
		this.requestQueue.push(function () {
			controller.performRead(section, key, callback);
		});
		if (notify === true) {
			this.addUpdateListener(section, key, callback);
		}
		if (this.reading === false) {
			this.nextQueue();
		}
		return true;
	},
	
	hardRead: function (section, key, callback) {
		// PUBLIC
		// Clear the local cache, and then perform a normal read
		delete this.responseCache[this.dictionary[section].target];
		this.read(section, key, callback);
	},
	
	performRead: function (section, key, callback) {
		// PRIVATE
		// This method is called by read()
		var readable = this.dictionary[section],
			decodeOpts = readable[key],
			controller = this,
			r, decoded;
			
		if (typeOf(section) !== 'string' || typeOf(key) !== 'string' || typeOf(callback) !== 'function' || !decodeOpts) {
			return null;
		}
		// Check local cache
		// NOTE: Caching is "aggressive". Even if a section of the library is marked uncacheable, we will still return a cached result
		// 	if the cache contains data for the section that is less than .5 seconds old. Many structures contain sets of data that are
		// 	returned all at once with every read. If we want to read 4 temperature probes (cacheable = false) we only need to make a
		// 	single XHR request to the BCS to get the data for all 4. Aggressive caching makes this possible even for uncacheable data.
		if (this.responseCache[decodeOpts.target] !== undefined && (MooCS.Dictionary.cacheable[decodeOpts.target] || this.responseCache[decodeOpts.target].asOf > (Date.now() - 500))) {
			decoded = this.decode(this.responseCache[decodeOpts.target].value, decodeOpts);
			callback.apply(callback, [decoded]);
			this.nextQueue();
		} else {
			r = new Request({
				url: '/lib/php/backend.php',
				data: Object.toQueryString({ location: this.location, target: decodeOpts.target, mode: 'get', message: null }),
				method: 'get',
				timeout: 5000,
				onFailure: function () {
					// Pass the failure through the decoder so we return an expected type
					decoded = controller.decode('Request failed.', decodeOpts);
					callback.apply(callback, [decoded]);
					controller.nextQueue();
				},
				onTimeout: function () {
					// Pass the failure through the decoder so we return an expected type
					decoded = controller.decode('Request timed out.', decodeOpts);
					callback.apply(callback, [decoded]);
					controller.nextQueue();
				},
				onSuccess: function (responseText) {
					// Return the decoded response
					decoded = controller.decode(responseText, decodeOpts);
					controller.responseCache[decodeOpts.target] = { asOf: Date.now(), value: responseText };
					callback.apply(callback, [decoded]);
					// Notify any listeners that the cache has been updated
					controller.cacheUpdated(decodeOpts.target);
					// Advance the queue
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
		if (raw === 'Request timed out.' || raw === 'Request failed.') {
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
				if (options.encoding === 'process-state') {
					temp = (Number.from(segments.slice(options.limits[0], options.limits[0] + 1)) >> (8 * (options.position % 4))) & 0xFF;
					if (temp === 255) {
						// Process entirely off
						result = false;
					} else {
						// State ID
						result = temp;
					}
				} else if (options.encoding === 'temperature-10') {
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
	
	cacheUpdated: function (structure) {
		// PRIVATE
		// Fires when an updated cached copy of structure becomes available.
		if (this.listeners[structure] !== undefined) {
			this.listeners[structure].each(function (f) {
				this.read(f.section, f.key, f.listener);
			}, this);
		}
	},
	
	addUpdateListener: function (section, key, listener) {
		// PUBLIC
		// Call this method just like read().
		// listener will be registered to be called whenever the structure that provides
		// read values for section[key] becomes available.
		// Returns false on bad arguments, true on listener added.
		if (this.dictionary[section] === undefined || this.dictionary[section][key] === undefined || typeOf(listener) !== 'function') {
			return false;
		}
		var structure = this.dictionary[section][key].target;
		
		if (this.listeners[structure] === undefined) {
			this.listeners[structure] = [];
		}
		this.listeners[structure].push({ section: section, key: key, listener: listener });
		return true;
	},
	
	removeUpdateListener: function (listener) {
		// PUBLIC
		// Remove the specified listener function.
		// Returns false on bad arguments, undefined if listener doesn't exist, true on listener removed.
		var removed = false;
		
		if (typeOf(listener) !== 'function') {
			return false;
		}
		Object.each(this.listeners, function (listeners) {
			listeners.each(function (l, index) {
				if (l.listener === listener) {
					listeners.splice(index, 1);
					removed = true;
				}
			});
		});
		return removed || undefined;
	},
	
	startPolling: function (interval) {
		// PUBLIC
		// Poll all non-cacheable structures for which listeners have been registered at interval
		if (typeOf(interval) !== 'number') {
			return false;
		}
		var controller = this,
			structures = [];
		
		Object.each(this.listeners, function (listeners, structure) {
			structures.include(structure);
		}, this);
		// this.pollers[structure] = this.poll(structure);
		structures.each(function (s) {
			if (this.pollers[s] !== undefined) {
				clearInterval(this.pollers[s]);
				delete this.pollers[s];
			}
			this.pollers[s] = this.poll(s, interval);
		}, this);
		return true;
	},
	
	stopPolling: function () {
		// PUBLIC
		// Cease all polling
		Object.each(this.listeners, function (listeners, structure) {
			if (this.pollers[structure] !== undefined) {
				clearInterval(this.pollers[structure]);
				delete this.pollers[structure];
			}
		}, this);
	},
	
	poll: function (structure, interval) {
		// PRIVATE
		// Initiate polling the requested structure file at interval
		var r, poller;
		
		r = new Request({
			url: '/lib/php/backend.php',
			data: Object.toQueryString({ location: this.location, target: structure, mode: 'get', message: null }),
			method: 'get',
			onTimeout: function () {
				this.nextPoll();
			}.bind(this),
			onComplete: function () {
				this.nextPoll();
			}.bind(this),
			onSuccess: function (responseText) {
				this.responseCache[structure] = { asOf: Date.now(), value: responseText };
				this.cacheUpdated(structure);
			}.bind(this)
		});
		poller = function () {
			// Check local cache, just in case another unrelated function has updated the structure in the last 500ms
			if (MooCS.Dictionary.cacheable[structure] || (this.responseCache[structure] && this.responseCache[structure].asOf > (Date.now() - 500))) {
				// Structures marked cacheable will never cause a poll request
				return;
			}
			this.pollQueue.push(function () { r.send(); });
			if (this.polling === false) {
				this.nextPoll();
			}
		}.bind(this);
		return poller.periodical(interval);
	},
	
	write: function (value, section, key) {
		// PUBLIC
		// Write the requested value to the key in section
		// Clears any local cache for section as well
		if (typeOf(value) !== 'string' || typeOf(section) !== 'string' || typeOf(key) !== 'string') {
			return false;
		}
		delete this.responseCache[this.dictionary[section].target];
	},
	
	encode: function () {
		
	},
	
	nextQueue: function () {
		// PRIVATE
		// Execute the next request in the queue, if any
		if (this.requestQueue.length > 0) {
			this.reading = true;
			this.requestQueue.shift().apply(this);
		} else {
			this.reading = false;
		}
		if (this.activityListener) {
			this.activityListener(this.reading || this.polling);
		}
	},
	
	nextPoll: function () {
		// PRIVATE
		// Execute the next request in the queue, if any
		if (this.pollQueue.length > 0) {
			this.polling = true;
			this.pollQueue.shift().apply(this);
		} else {
			this.polling = false;
		}
		if (this.activityListener) {
			this.activityListener(this.reading || this.polling);
		}
	},
	
	addActivityListener: function (listener) {
		// PUBLIC
		// Add a listener that will be executed whenever the state of this BCS changes activity.
		if (typeOf(listener) === 'function') {
			this.activityListener = listener;
		}
	}
});