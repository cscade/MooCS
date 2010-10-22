window.addEvent('domready', function () {
	var testRead;
	
	document.id('refresh').addEvent('click', function () {
		testRead();
	});
	
	document.id('hardRefresh').addEvent('click', function () {
		testRead(true);
	});
	
	$$('div.stackLeft.library span').set('text', BCS.$libraryVersion);
	$$('div.stackLeft.target span').set('text', BCS.$location);
	
	testRead = function (hard) {
		var output = document.id('output').empty();
		Object.each(BCS.Comm.list('read'), function (keys, section) {
			var sectionEl = new Element('div.section');
			
			output.grab(sectionEl);
			sectionEl.grab(new Element('h1', {
				text: section
			}));
			keys.each(function (key) {
				BCS.Comm[(hard) ? 'hardRead' : 'read'](section, key, function (response) {
					sectionEl.grab(new Element('p', {
						html: key + ': <strong>' + response + '</strong>'
					}));
				});
			});
		});
	};
});