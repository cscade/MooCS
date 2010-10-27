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
	var testRead, autoUpdate, doChart, chart,
		chartData0 = [],
		chartData1 = [],
		chartData2 = [],
		chartData3 = [],
		chartCounter = 0,
		unit0 = new BCS.Device('192.168.110.6');
	
	$$('div.stackRight.library span').set('text', BCS.$libraryVersion);
	$$('div.stackRight.target span').set('text', 'unit0, ' + unit0.location);
	
	unit0.read('firmware', 'version', function (response) {
		$$('div.stackRight.firmware span')[0].set('text', response);
	});
	
	document.id('showAll').addEvent('click', function () {
		$$('div.section input').fireEvent('click');
	});
	
	testRead = function (hard) {
		var output = document.id('output').empty();
		Object.each(BCS.list('read'), function (keys, section) {
			var sectionEl = new Element('div.section');
			
			output.grab(sectionEl);
			sectionEl.grab(new Element('h1', {
				text: section
			}));
			sectionEl.grab(new Element('input[type=button]', { value: 'Request' }).addEvent('click', function () {
				sectionEl.getElements('p').destroy();
				keys.each(function (key) {
					unit0.read(section, key, function (response) {
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
	
	// Chart
	chart = new JSChart('chart', 'line');
	chart.setTitle('');
	chart.setAxisNameX('Seconds Elapsed');
	chart.setAxisNameY('F');
	doChart = function () {
		chartCounter += 1;
		unit0.read('temp', 'probe0', function (r) {
			chartData0.push([chartCounter, Math.round(r)]);
			if (chartData0.length > 2000) {
				chartData0.splice(0, chartData0.length - 2000);
			}
		});
		unit0.read('temp', 'probe1', function (r) {
			chartData1.push([chartCounter, Math.round(r)]);
			if (chartData1.length > 2000) {
				chartData1.splice(0, chartData1.length - 2000);
			}
		});
		unit0.read('temp', 'probe2', function (r) {
			chartData2.push([chartCounter, Math.round(r)]);
			if (chartData2.length > 2000) {
				chartData2.splice(0, chartData2.length - 2000);
			}
		});
		unit0.read('temp', 'probe3', function (r) {
			chartData3.push([chartCounter, Math.round(r)]);
			if (chartData3.length > 2000) {
				chartData3.splice(0, chartData3.length - 2000);
			}
		});
	}.periodical(1000);
	autoUpdate = function () {
		chart.setDataArray(chartData0, '0');
		chart.setDataArray(chartData1, '1');
		chart.setDataArray(chartData2, '2');
		chart.setDataArray(chartData3, '3');
		chart.setLineColor('#961703', '0');
		chart.setLineColor('#331595', '1');
		chart.setLineColor('#3c7d96', '2');
		chart.setLineColor('#4b9531', '3');
		chart.draw();
	}.periodical(10000);
	
});