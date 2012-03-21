/*
---

name: Decoder

description: Decoder handles translating the BCS response structures into the response types desired by the user.

license: Creative Commons Attribution-ShareAlike 3.0 Unported License.

requires:
	- /MooCS

provides: [Decoder]

authors: [Carson S. Christian](mailto:cchristian@moocsinterface.net)

...
*/
/*globals Class, MooCS, typeOf */
MooCS.Decoder = new Class({
	
	initialize: function (options, callback) {
		this.options = options;
		this.callback = (typeOf(callback) === 'function') ? callback : function () {};
	},
	
	go: function (raw) {
		// Convert the raw value broken down at limits according to the options object.
		var options = this.options,
			result = null,
			segments, temp;
		
		if (typeOf(raw) === 'string' && raw.length > 0) {
			segments = raw.split(',');
			if (segments.length > 1) {
				try {
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
				} catch (e) {}
			}
		}
		this.callback.apply(this.callback, [result]);
	}
	
});