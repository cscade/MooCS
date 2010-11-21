/*
---

name: Pipeline

description: Pipeline manages the data path to and from the physical device. Whereas Device is the abstraciton layer for the BCS, Pipeline is the transport layer.

license: Creative Commons Attribution-ShareAlike 3.0 Unported License.

requires:
	- /MooCS
	- Core/Request

provides: [Pipeline]

authors: [Carson S. Christian](mailto:cchristian@moocsinterface.net)

...
*/
MooCS.Pipeline = new Class({
	Implements: [Options],
	options: {
		cacheAge : 500,
		timeout: 5000
	},
	
	initialize: function (location, translator, options) {
		this.setOptions(options);
		this.deviceUrl = location;
		this.translatorUrl = translator;
		this.requests = {};
		this.cache = {};
	},
	
	read: function (decoder) {
		// Ask for data
		if (this.checkCache(decoder.options.target)) {
			// Use cache if possible
			decoder.go(this.getCache(decoder.options.target));
			return;
		}
		if (this.checkRequests(decoder.options.target)) {
			this.watchRequest(decoder);
		} else {
			this.generateRequest(decoder);
		}
	},
	
	checkCache: function (structure) {
		// Return bool indicating cache availability for a structure
		if (this.cache[structure] === undefined) {
			return false;
		} else if ((Date.now() - this.cache[structure].asOf) > this.options.cacheAge) {
			delete this.cache[structure];
			return false;
		}
		return true;
	},
	
	updateCache: function (structure, response) {
		// Update the inboard cache with a new response
		this.cache[structure] = { asOf: Date.now(), value: response };
	},
	
	getCache: function (structure) {
		//  Return the currently cached response
		return this.cache[structure].value;
	},
	
	checkRequests: function (structure) {
		// Determine if an existing request for this structure is queued
		if (this.requests[structure] === undefined) {
			return false;
		}
		return true;
	},
	
	generateRequest: function (decoder) {
		// Create a new request and and it to the queue
		var request = new Request({
			url: this.translatorUrl,
			data: Object.toQueryString({ location: this.deviceUrl, target: decoder.options.target, mode: 'get', message: null }),
			method: 'get'			
		});
		request.addEvent('success', function (r) {
			decoder.go(r);
			this.updateCache(decoder.options.target, r);
			this.deleteCurrentRequest();
		}.bind(this));
		request.timeStamp = Date.now();
		this.requests[decoder.options.target] = request;
		this.start();
	},
	
	watchRequest: function (decoder) {
		// Watch for the return value of an existing request
		this.requests[decoder.options.target].addEvent('success', function (r) {
			decoder.go(r);
		});
	},
	
	deleteCurrentRequest: function () {
		// Clear the current request from the pipeline
		delete this.current;
	},
	
	getNextRequest: function () {
		// Return the oldest request in the queue
		var age = null, oldest = undefined, key = null;
		
		Object.each(this.requests, function (r, k) {
			if (age === null || r.timeStamp < age) {
				age = r.timeStamp;
				oldest = r;
				key = k;
			}
		});
		delete this.requests[key];
		return oldest;
	},
	
	runRequest: function () {
		if (this.current !== undefined) {
			var age = Date.now() - this.current.startTime;
			if (age > this.options.timeout) {
				this.deleteCurrentRequest();
			}
		} else {
			if (Object.getLength(this.requests) > 0) {
				this.current = { startTime: Date.now(), request: this.getNextRequest() };
				this.current.request.send();
			} else {
				this.stop();
			}
		}
	},
	
	start: function () {
		// Start the pipeline
		var host = this;
		
		if (this.runner !== undefined) {
			return;
		}
		this.runner = (function () {
			host.runRequest();
		}).periodical(1);
	},
	
	stop: function () {
		// Stop the pipeline
		clearTimeout(this.runner);
		delete this.runner;
	}
	
});