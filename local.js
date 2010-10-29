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
	var addDevice;
	
	// Page header details
	$$('div.stackRight.library span').set('text', MooCS.$libraryVersion);
	
	addDevice = function (name, address) {
		if (typeOf(name) !== 'string' || typeOf(address) !== 'string' || name.length < 1 || address.length < 7) {
			alert('Supply a text name and TCP/IP address for the new contoller first.\n\nAddress should be in the form:\n192.168.0.1:80\nPort number is optional.');
			return;
		}
		// Initialize a new controller
		var controller = new MooCS.Device(name, address, function () {
			var instanceID = String.uniqueID(),
				chartData0 = [],
				chartData1 = [],
				chartData2 = [],
				chartData3 = [],
				chartCounter = 0,
				autoUpdate, doChart, chart, output, collapse;
			
			// Build example boxes for all supported dictionary entries
			document.id('raw').adopt(new Element('h2#rawHeader' + instanceID + '.sectionToggle', {
				text: this.name + ' Raw Values'
			}), new Element('div#output' + instanceID));
			collapse = new MooCS.Collapsible('rawHeader' + instanceID, 'output' + instanceID).clicker.fireEvent('click');
			output = document.id('output' + instanceID);
			Object.each(this.list('read'), function (keys, section) {
				var sectionEl = new Element('div.section');

				output.grab(sectionEl);
				sectionEl.grab(new Element('h1', {
					text: section
				}));
				sectionEl.grab(new Element('input[type=button]', { value: 'Request' }).addEvent('click', function () {
					sectionEl.getElements('p').destroy();
					keys.each(function (key) {
						this.read(section, key, function (response) {
							sectionEl.grab(new Element('p', {
								html: key + ': <strong>' + response + '</strong>'
							}));
						});
					}.bind(this));
				}.bind(this)));
			}, this);
			// Chart
			document.id('charts').grab(new Element('div#chart' + instanceID + '.chart'));
			chart = new JSChart('chart' + instanceID, 'line');
			chart.setTitle(controller.name + ', ' + this.location + ' - ' + ((this.BCS460) ? 'BCS-460' : (this.BCS462) ? 'BCS-462' : 'Unknown'));
			chart.setAxisNameX('Seconds Elapsed');
			chart.setAxisNameY('F');
			doChart = function () {
				chartCounter += 1;
				this.read('temp', 'probe0', function (r) {
					var v = Math.round(r);

					if (typeOf(v) === 'number') {
						chartData0.push([chartCounter, v]);
						if (chartData0.length > 2000) {
							chartData0.splice(0, chartData0.length - 2000);
						}
					}
				});
				this.read('temp', 'probe1', function (r) {
					var v = Math.round(r);

					if (typeOf(v) === 'number') {
						chartData1.push([chartCounter, v]);
						if (chartData1.length > 2000) {
							chartData1.splice(0, chartData1.length - 2000);
						}
					}
				});
				this.read('temp', 'probe2', function (r) {
					var v = Math.round(r);

					if (typeOf(v) === 'number') {
						chartData2.push([chartCounter, v]);
						if (chartData2.length > 2000) {
							chartData2.splice(0, chartData2.length - 2000);
						}
					}
				});
				this.read('temp', 'probe3', function (r) {
					var v = Math.round(r);

					if (typeOf(v) === 'number') {
						chartData3.push([chartCounter, v]);
						if (chartData3.length > 2000) {
							chartData3.splice(0, chartData3.length - 2000);
						}
					}
				});
			}.bind(this).periodical(1000);
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
	};
	
	// Default Controllers
	addDevice('MyBCS', '192.168.110.6');
	addDevice('DemoBCS', 'ecc.webhop.org:8081');
	
	// Add Device Input
	document.id('buttonAddDevice').addEvent('click', function () {
		addDevice(document.id('input_Name').get('value'), document.id('input_Address').get('value'));
	});
	
});