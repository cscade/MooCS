/*
---

name: Pipeline Addons

description: Provides additional, optional functionality to the Pipeline class.

license: Creative Commons Attribution-ShareAlike 3.0 Unported License.

requires:
	- More/Class.refactor
	- /Pipeline

provides: [Pipeline.Stats]

authors: [Carson S. Christian](mailto:cchristian@moocsinterface.net)

...
*/
MooCS.Pipeline = Class.refactor(MooCS.Pipeline, {
	// Pipeline.Stats
	
	initialize: function (location, translator, options) {
		this.stats = {
			read: {
				requests: 0,
				timeouts: 0,
				lastRequestTime: 0,
				responseTimes: []
			},
			write: {
				requests: 0,
				timeouts: 0,
				lastRequestTime: 0,
				responseTimes: []
			}
		};
		this.previous(location, translator, options);
	},
	
	attachEvents: function (request, decoder) {
		request.addEvent('success', function (r) {
			this.recordResponseTime();
		}.bind(this));
		this.previous(request, decoder);
	},
	
	send: function () {
		this.stats.read.requests += 1;
		this.stats.read.lastRequestTime = Date.now();
		this.previous();
	},
	
	timeout: function () {
		this.stats.read.timeouts += 1;
		this.previous();
	},
	
	recordResponseTime: function () {
		// Record the response time in the stats
		if (this.stats.read.responseTimes.length > 59) {
			this.stats.read.responseTimes.splice(0, 1);
		}
		this.stats.read.responseTimes.push((Date.now() - this.stats.read.lastRequestTime) / 1000);
	}
	
});