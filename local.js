window.addEvent('domready', function () {
	Object.each(BCS.Core.list('read'), function (keys, section) {
		document.body.grab(new Element('h1', {
			text: section
		}));
		keys.each(function (key) {
			BCS.Core.read(section, key, function (response) {
				document.body.grab(new Element('p', {
					text: key + ': ' + response
				}));
			});
		});
	});
});