/*
---

name: Cache

description: Caching mechanism for data structures.

license: Creative Commons Attribution-ShareAlike 3.0 Unported License.

requires:
	- /MooCS
	- /Dictionary

provides: [Cache]

authors: [Carson S. Christian](mailto:cchristian@moocsinterface.net)

...
*/
MooCS.Cache = new Class({
	Implements: [Options],
	options: {
		age : 500
	},
	
	initialize: function (location, translator, options) {
		this.cache = {};
	},
	
	cacheable: function (structure) {
		// Determine if a structure is cacheable
		return MooCS.Dictionary.cacheable[structure] === true;
	},
	
	check: function (structure) {
		// Return bool indicating cache availability for a structure
		if (this.cacheable(structure) === false || this.cache[structure] === undefined) {
			return false;
		} else if ((Date.now() - this.cache[structure].asOf) > this.options.age) {
			delete this.cache[structure];
			return false;
		}
		return true;
	},
	
	update: function (structure, response) {
		// Update the inboard cache with a new response
		if (!this.cacheable(structure)) return;
		this.cache[structure] = { asOf: Date.now(), value: response };
	},
	
	get: function (structure) {
		//  Return the currently cached response
		return this.cache[structure].value;
	}
	
});