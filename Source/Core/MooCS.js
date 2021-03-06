/*
---

name: MooCS Namespace

description: Provides the MooCS namespace.

license: Creative Commons Attribution-ShareAlike 3.0 Unported License.

provides: [MooCS]

authors: [Carson S. Christian](mailto:cc@amplego.com)

...
*/
!function (context) {
	if (context.MooCS) return;
	
	var MooCS = function () {
		this.$instances = {};
	};
	
	context.MooCS = new MooCS();
}(this);