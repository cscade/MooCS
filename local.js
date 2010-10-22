window.addEvent('domready', function () {
	Object.each(BCS.Comm.list('read'), function (keys, section) {
		document.body.grab(new Element('h1', {
			text: section
		}));
		keys.each(function (key) {
			BCS.Comm.read(section, key, function (response) {
				document.body.grab(new Element('p', {
					html: key + ': <strong>' + response + '</strong>'
				}));
			});
		});
	});
});