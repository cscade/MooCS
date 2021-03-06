/*
---

name: Poll

description: A polling object that can repetitively refresh structures.

license: Creative Commons Attribution-ShareAlike 3.0 Unported License.

requires:
	- /MooCS
	- /Pipeline
	- Core/Class.Extras

provides: [Poll]

authors: [Carson S. Christian](mailto:cc@amplego.com)

...
*/
MooCS.Poll = new Class({
	Implements: [Options, Events],
	options: {
		interval: 1000	// Delay in ms between polls
	},
	
	initialize: function (device, options) {
		this.device = device;
		this.setOptions(options);
	},
	
	run: function () {
		var that = this;
		// The main run loop. Executes every this.options.interval after calling start()
		if (Object.getLength(this.device.listeners) < 1) return;
		Object.each(this.device.listeners, function (listeners) {
			listeners.each(function (decoder) {
				that.device.pipeline.read(decoder);
			});
		});
	},
	
	start: function () {
		// Start the poller
		var that = this;
		
		if (this.runner !== undefined) {
			return;
		}
		this.runner = (function () {
			that.run();
		}).periodical(this.options.interval);
		this.fireEvent('start');
	},
	
	stop: function () {
		// Stop the poller
		clearTimeout(this.runner);
		delete this.runner;
		this.fireEvent('stop');
	}
	
});