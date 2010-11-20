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
	
	initialize: function (location, translator) {
		this.deviceUrl = location;
		this.translatorUrl = translator;
		this.responseCache = {};
		this.communications = { responseTimes: [], duplicatePolls: 0, timeouts: 0, exceptions: 0 };
	},
	
	readRequest: function (decoder) {
		var request;
		
		var request = new Request({
			url: this.translatorUrl,
			data: Object.toQueryString({ location: this.deviceUrl, target: decoder.options.target, mode: 'get', message: null }),
			method: 'get',
			timeout: 5000,
			onException: function () {
				this.communications.exceptions += 1;
			}.bind(this),
			onFailure: function () {
				decoder.go('Request failed.');
			},
			onTimeout: function () {
				this.communications.timeouts += 1;
				decoder.go('Request timed out.');
			}.bind(this),
			onSuccess: function (responseText) {
				decoder.go(responseText);
				// controller.responseCache[decodeOpts.target] = { asOf: Date.now(), value: responseText };
				// Notify any listeners that the cache has been updated
				// controller.cacheUpdated(decodeOpts.target);
			}
		});
	}
	
});