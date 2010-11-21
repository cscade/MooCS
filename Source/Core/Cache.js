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
	Implements: [Options, Events],
	options: {
		aggressive: true,		// Cache all structures 'aggressively', regardless of their cacheable flag
		aggressiveAge : 500		// Un-cacheable structues that have been agressivley cached will expire after this age
		// onUpdate: function (structure, data) {} Fires whenever a new copy of a structure becomes available, regardless of it's cacheability
	},
	
	initialize: function () {
		this.cache = {};
	},
	
	cacheable: function (structure) {
		// Determine if a structure is cacheable
		return MooCS.Dictionary.cacheable[structure] === true;
	},
	
	check: function (structure) {
		// Return bool indicating cache availability for a structure
		if (this.cache[structure] === undefined) {
			return false;
		} else if (this.cacheable(structure) === false && (Date.now() - this.cache[structure].asOf) > this.options.aggressiveAge) {
			// Expire old aggressively cached structures
			delete this.cache[structure];
			return false;
		}
		return true;
	},
	
	update: function (structure, response) {
		// Update the inboard cache with a new response
		this.fireEvent('update', [structure, response]);
		if (!this.cacheable(structure) && this.options.aggressive !== true) return;
		this.cache[structure] = { asOf: Date.now(), value: response };
	},
	
	get: function (structure) {
		//  Return the currently cached response
		return this.cache[structure].value;
	}
	
});