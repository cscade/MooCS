/*
---

name: Pipeline Addons

description: Provides additional, optional functionality to the Pipeline class.

license: Creative Commons Attribution-ShareAlike 3.0 Unported License.

requires:
	- /Pipeline

provides: [Pipeline.Stats]

authors: [Carson S. Christian](mailto:cchristian@moocsinterface.net)

...
*/
Pipeline.implement({
	// Pipeline.Stats
	recordResponseTime: function (timestamp) {
		// Record the response time in the communications log
		if (timestamp === undefined || Date.now() === timestamp) {
			return;
		}
		if (this.communications.responseTimes.length > 59) {
			this.communications.responseTimes.splice(0, 1);
		}
		this.communications.responseTimes.push((Date.now() - timestamp) / 1000);
	}
	
});