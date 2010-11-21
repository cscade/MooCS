/*
---

name: Pipeline

description: Pipeline manages the data path to and from the physical device. Whereas Device is the abstraciton layer for the BCS, Pipeline is the transport layer.

license: Creative Commons Attribution-ShareAlike 3.0 Unported License.

requires:
	- /MooCS
	- /Cache
	- Core/Request

provides: [Pipeline]

authors: [Carson S. Christian](mailto:cchristian@moocsinterface.net)

...
*/
MooCS.Pipeline = new Class({
	Implements: [Options],
	options: {
		timeout: 5000
	},
	
	initialize: function (location, translator, options) {
		this.setOptions(options);
		this.deviceUrl = location;
		this.translatorUrl = translator;
		this.requests = {};
		this.cache = new MooCS.Cache();
	},
	
	read: function (decoder) {
		// Ask for data
		if (this.cache.check(decoder.options.target)) {
			// Use cache if possible
			decoder.go(this.cache.get(decoder.options.target));
			return;
		}
		if (this.checkRequests(decoder.options.target)) {
			this.watchRequest(decoder);
		} else {
			this.generateRequest(decoder);
		}
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
			this.cache.update(decoder.options.target, r);
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
		// The core check function. Determines if a request is in the pipeline, clears old requests, and stops the pipeline when idle.
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