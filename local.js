window.addEvent('domready', function () {
	var testRead;
	
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
			sectionEl.grab(new Element('input[type=button]', { value: 'Request' }).addEvent('click', function () {
				sectionEl.getElements('p').destroy();
				keys.each(function (key) {
					BCS.Comm.read(section, key, function (response) {
						sectionEl.grab(new Element('p', {
							html: key + ': <strong>' + response + '</strong>'
						}));
					});
				});
			}));
		});
	};
	
	// Initial load
	testRead();
});