Object.implement({
	equal: function (a, b) {
		// Returns true if two objects have the same keys and values.
		// Will traverse nested objects, will NOT traverse nested arrays.
		// Presence of arrays will always return false regardless of array contents.
		return Object.every(a, function (e, k) {
			if (!b[k]) return false;
			if (typeOf(b[k]) === 'object' && typeOf(e) === 'object') {
				return Object.equal(b[k], e);
			} else {
				return b[k] == e;
			}
		}) && Object.every(b, function (e, k) {
			if (!a[k]) return false;
			if (typeOf(a[k]) === 'object' && typeOf(e) === 'object') {
				return Object.equal(a[k], e);
			} else {
				return a[k] == e;
			}
		});
	}
});