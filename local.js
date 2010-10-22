window.addEvent('domready', function () {
	BCS.Core.read('ethernet', 'currentIP', function (response) {
		document.body.grab(new Element('p', {
			text: 'IP Address: ' + response
		}));
	});
});