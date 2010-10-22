window.addEvent('domready', function () {
	var testRead;
	
	document.id('refresh').addEvent('click', function () {
		testRead();
	});
	
	$$('div.stackLeft.library span').set('text', BCS.$libraryVersion);
	$$('div.stackLeft.target span').set('text', BCS.$location);
	
	testRead = function () {
		var output = document.id('output').empty();
		Object.each(BCS.Comm.list('read'), function (keys, section) {
			output.grab(new Element('h1', {
				text: section
			}));
			keys.each(function (key) {
				BCS.Comm.read(section, key, function (response) {
					output.grab(new Element('p', {
						html: key + ': <strong>' + response + '</strong>'
					}));
				});
			});
		});
	};
});