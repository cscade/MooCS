/*
---

name: Device

description: The Device instance generator.

license: Creative Commons Attribution-ShareAlike 3.0 Unported License.

requires:
	- /MooCS
	- Core/Class
	- Core/Class.Extras
	- Core/Object
	- /Dictionary
	- /Decoder
	- /Pipeline

provides: [Device]

authors: [Carson S. Christian](mailto:cchristian@moocsinterface.net)

...
*/
/*global MooCS, Class, Request, typeOf */
MooCS.Device = new Class({
	Implements: [Options, Events],
	options: {
		location: '',
		translator: ''
		// onCommunication: function () {} Fires when the class opens a request to the BCS device
		// onIdle: function () {} Fires when the class has no device communications pending
	},
	
	initialize: function (alias, options, startup) {
		var controller = this;
		
		this.setOptions(options);
		this.name = alias;
		// Locals
		this.listeners = {};
		// Initial Dictionary (device detection only)
		this.dictionary = {
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
		};
		// Pipeline instance
		this.pipeline = new MooCS.Pipeline(this.options.location, this.options.translator);
		this.pipeline.cache.addEvent('update', function (structure, data) {
			// Update all listeners with new data
			if (this.listeners[structure] !== undefined) {
				this.listeners[structure].each(function (decoder) {
					decoder.go(data);
				});
			}
		}.bind(this));
		// Events
		this.pipeline.addEvents({
			start: function () { controller.fireEvent('communication'); },
			stop: function () { controller.fireEvent('idle'); }
		});
		// Controller Identification
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
		// Store instance reference
		MooCS.$instances[alias] = this;
	},
	
	getCapabilities: function () {
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
		// Return the requested value for the key in section to the callback function provided.
		// Execute this.getCapabilities() for a dictionary of valid sections and keys.
		// notify:
		// 	If notify is true, an update listener will automatically be added using the callback function provided.
		// 	In that case, callback will execute every time the cached data changes.
		if (typeOf(section) !== 'string' || typeOf(key) !== 'string' || this.dictionary[section] === undefined || this.dictionary[section][key] === undefined || typeOf(callback) !== 'function') {
			return false;
		}
		var decoder = new MooCS.Decoder(this.dictionary[section][key], function (r) { callback.apply(callback, [r]); });
		this.pipeline.read(decoder);
		if (notify === true) {
			this.addUpdateListener(this.dictionary[section][key].target, decoder);
		}
		return true;
	},
	
	write: function () {
		
	},
	
	addUpdateListener: function (structure, decoder) {
		// decoder will be registered to be called whenever the structure is updated.
		// Returns false on bad arguments, true on listener added.
		if (!instanceOf(decoder, MooCS.Decoder)) {
			return false;
		}
		if (this.listeners[structure] === undefined) {
			this.listeners[structure] = [];
		}
		this.listeners[structure].include(decoder);
		return true;
	},
	
	removeUpdateListener: function (callback) {
		// Remove the specified callback function.
		// Returns false on bad arguments, undefined if callback doesn't exist, true on callback removed.
		var removed = false;
		
		if (typeOf(callback) !== 'function') {
			return false;
		}
		Object.each(this.listeners, function (listeners) {
			listeners.each(function (decoder, index) {
				if (decoder.callback === callback) {
					listeners.splice(index, 1);
					removed = true;
				}
			});
		});
		return removed || undefined;
	}
});