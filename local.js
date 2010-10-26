/*	MooCS.js
	2010-10-19
	Carson S. Christian
	cchristian@moocsinterface.net
	
	Local code for the Mooks test page.
*/
/*
	This work is licensed under the Creative Commons Attribution-ShareAlike 3.0 Unported License.
	To view a copy of this license, visit http://creativecommons.org/licenses/by-sa/3.0/
	or send a letter to Creative Commons, 171 Second Street, Suite 300, San Francisco, California, 94105, USA.
*/
window.addEvent('domready', function () {
	var testRead;
	
	$$('div.stackRight.library span').set('text', BCS.$libraryVersion);
	$$('div.stackRight.target span').set('text', BCS.$location);
	
	document.id('showAll').addEvent('click', function () {
		$$('div.section input').fireEvent('click');
	});
	
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