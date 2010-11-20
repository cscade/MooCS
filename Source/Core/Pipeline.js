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
		cacheAge : 500
	},
	
	initialize: function (location, translator, options) {
		this.setOptions(options);
		this.deviceUrl = location;
		this.translatorUrl = translator;
		this.requests = {};
		this.cache = {};
		this.commLog = { responseTimes: [], duplicatePolls: 0, timeouts: 0, exceptions: 0 };
	},
	
	read: function (decoder) {
		// Ask for data
		if (this.checkCache(decoder.options.target)) {
			// Use cache if possible
			decoder.go(this.getCache(decoder.options.target));
			return;
		}
		if (!this.checkRequests(decoder.options.target)) {
			this.generateRequest(decoder);
		} else {
			// Watch existing
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
	},
	
	generateRequest: function (decoder) {
		var request = new Request({
			url: this.translatorUrl,
			data: Object.toQueryString({ location: this.deviceUrl, target: decoder.options.target, mode: 'get', message: null }),
			method: 'get'			
		});
		request.addEvent('success', function (r) {
			decoder.go(r);
			this.updateCache(decoder.options.target, responseText);
		}.bind(this));
		this.requests[decoder.options.target] = request;
	}
	
});