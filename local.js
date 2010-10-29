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
/*global $$, MooCS, Element, JSChart, typeOf */
window.addEvent('domready', function () {
	var autoUpdate, doChart, chart,
		chartData0 = [],
		chartData1 = [],
		chartData2 = [],
		chartData3 = [],
		chartCounter = 0,
		sCharts, sRaw,
		unit0, unit1;
		
	// Page sections
	sCharts = new MooCS.Collapsible('section_tempPlots', document.id('section_tempPlots').getNext('div'));
	sRaw = new MooCS.Collapsible('section_Raw', document.id('section_Raw').getNext('div')).clicker.fireEvent('click');
		
	// Initialize a new controller
	unit0 = new MooCS.Device('ecc.webhop.org:8081', function () {
		var output = document.id('output').empty(),
			controller = this;
		
		// Build example boxes for all supported dictionary entries
		Object.each(controller.list('read'), function (keys, section) {
			var sectionEl = new Element('div.section');
			
			output.grab(sectionEl);
			sectionEl.grab(new Element('h1', {
				text: section
			}));
			sectionEl.grab(new Element('input[type=button]', { value: 'Request' }).addEvent('click', function () {
				sectionEl.getElements('p').destroy();
				keys.each(function (key) {
					controller.read(section, key, function (response) {
						sectionEl.grab(new Element('p', {
							html: key + ': <strong>' + response + '</strong>'
						}));
					});
				});
			}));
		});
		// Page header details
		$$('div.stackRight.library span').set('text', MooCS.$libraryVersion);

		controller.read('firmware', 'version', function (response) {
			$$('div.stackRight.firmware span').set('text', response);
		});
	});
	
	// Chart
	chart = new JSChart('chart', 'line');
	chart.setAxisNameX('Seconds Elapsed');
	chart.setAxisNameY('F');
	doChart = function () {
		chartCounter += 1;
		unit0.read('temp', 'probe0', function (r) {
			var v = Math.round(r);
			
			if (typeOf(v) === 'number') {
				chartData0.push([chartCounter, v]);
				if (chartData0.length > 2000) {
					chartData0.splice(0, chartData0.length - 2000);
				}
			}
		});
		unit0.read('temp', 'probe1', function (r) {
			var v = Math.round(r);
			
			if (typeOf(v) === 'number') {
				chartData1.push([chartCounter, v]);
				if (chartData1.length > 2000) {
					chartData1.splice(0, chartData1.length - 2000);
				}
			}
		});
		unit0.read('temp', 'probe2', function (r) {
			var v = Math.round(r);
			
			if (typeOf(v) === 'number') {
				chartData2.push([chartCounter, v]);
				if (chartData2.length > 2000) {
					chartData2.splice(0, chartData2.length - 2000);
				}
			}
		});
		unit0.read('temp', 'probe3', function (r) {
			var v = Math.round(r);
			
			if (typeOf(v) === 'number') {
				chartData3.push([chartCounter, v]);
				if (chartData3.length > 2000) {
					chartData3.splice(0, chartData3.length - 2000);
				}
			}
		});
	}.periodical(1000);
	autoUpdate = function () {
		chart.setTitle('unit0, ' + unit0.location + ' - ' + ((unit0.BCS460) ? 'BCS-460' : (unit0.BCS462) ? 'BCS-462' : 'Unknown'));
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