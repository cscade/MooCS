/*	dictionary.462.js
	2010-10-19
	Carson S. Christian
	cchristian@moocsinterface.net
	
	Provides the translation dictionary for interpereting the BCS values.
	
	This file provides values for the BCS-462 that are not present in the BCS-460 dictionary.
*/
/*
	This work is licensed under the Creative Commons Attribution-ShareAlike 3.0 Unported License.
	To view a copy of this license, visit http://creativecommons.org/licenses/by-sa/3.0/
	or send a letter to Creative Commons, 171 Second Street, Suite 300, San Francisco, California, 94105, USA.
*/
/*global $$, MooCS, Element, Class, Request, typeOf, JSChart */
MooCS.readDict462 = {
	temp: {
		name4: {
			target: 'sysname.dat',
			limits: [85],
			format: 'string'
		},
		name5: {
			target: 'sysname.dat',
			limits: [86],
			format: 'string'
		},
		name6: {
			target: 'sysname.dat',
			limits: [87],
			format: 'string'
		},
		name7: {
			target: 'sysname.dat',
			limits: [88],
			format: 'string'
		},
		value4: {
			target: 'ultemp.dat',
			limits: [7],
			format: 'number',
			encoding: 'temperature-10'
		},
		value5: {
			target: 'ultemp.dat',
			limits: [8],
			format: 'number',
			encoding: 'temperature-10'
		},
		value6: {
			target: 'ultemp.dat',
			limits: [9],
			format: 'number',
			encoding: 'temperature-10'
		},
		value7: {
			target: 'ultemp.dat',
			limits: [10],
			format: 'number',
			encoding: 'temperature-10'
		},
		setpoint4: {
			target: 'ultemp.dat',
			limits: [7],
			format: 'number',
			encoding: 'temperature-10'
		},
		setpoint5: {
			target: 'ultemp.dat',
			limits: [8],
			format: 'number',
			encoding: 'temperature-10'
		},
		setpoint6: {
			target: 'ultemp.dat',
			limits: [9],
			format: 'number',
			encoding: 'temperature-10'
		},
		setpoint7: {
			target: 'ultemp.dat',
			limits: [10],
			format: 'number',
			encoding: 'temperature-10'
		}
	},
	input: {
		name4: {
			target: 'sysname.dat',
			limits: [89],
			format: 'string'
		},
		name5: {
			target: 'sysname.dat',
			limits: [90],
			format: 'string'
		},
		name6: {
			target: 'sysname.dat',
			limits: [91],
			format: 'string'
		},
		name7: {
			target: 'sysname.dat',
			limits: [92],
			format: 'string'
		},
		status4: {
			target: 'ultemp.dat',
			limits: [2],
			format: 'boolean',
			encoding: 'binary',
			position: 4
		},
		status5: {
			target: 'ultemp.dat',
			limits: [2],
			format: 'boolean',
			encoding: 'binary',
			position: 5
		},
		status6: {
			target: 'ultemp.dat',
			limits: [2],
			format: 'boolean',
			encoding: 'binary',
			position: 6
		},
		status7: {
			target: 'ultemp.dat',
			limits: [2],
			format: 'boolean',
			encoding: 'binary',
			position: 7
		}
	},
	output: {
		name6: {
			target: 'sysname.dat',
			limits: [93],
			format: 'string'
		},
		name7: {
			target: 'sysname.dat',
			limits: [94],
			format: 'string'
		},
		name8: {
			target: 'sysname.dat',
			limits: [95],
			format: 'string'
		},
		name9: {
			target: 'sysname.dat',
			limits: [96],
			format: 'string'
		},
		name10: {
			target: 'sysname.dat',
			limits: [97],
			format: 'string'
		},
		name11: {
			target: 'sysname.dat',
			limits: [98],
			format: 'string'
		},
		name12: {
			target: 'sysname.dat',
			limits: [99],
			format: 'string'
		},
		name13: {
			target: 'sysname.dat',
			limits: [100],
			format: 'string'
		},
		name14: {
			target: 'sysname.dat',
			limits: [101],
			format: 'string'
		},
		name15: {
			target: 'sysname.dat',
			limits: [102],
			format: 'string'
		},
		name16: {
			target: 'sysname.dat',
			limits: [103],
			format: 'string'
		},
		name17: {
			target: 'sysname.dat',
			limits: [104],
			format: 'string'
		},
		status6: {
			target: 'ultemp.dat',
			limits: [1],
			format: 'boolean',
			encoding: 'binary',
			position: 6
		},
		status7: {
			target: 'ultemp.dat',
			limits: [1],
			format: 'boolean',
			encoding: 'binary',
			position: 7
		},
		status8: {
			target: 'ultemp.dat',
			limits: [1],
			format: 'boolean',
			encoding: 'binary',
			position: 8
		},
		status9: {
			target: 'ultemp.dat',
			limits: [1],
			format: 'boolean',
			encoding: 'binary',
			position: 9
		},
		status10: {
			target: 'ultemp.dat',
			limits: [1],
			format: 'boolean',
			encoding: 'binary',
			position: 10
		},
		status11: {
			target: 'ultemp.dat',
			limits: [1],
			format: 'boolean',
			encoding: 'binary',
			position: 11
		},
		status12: {
			target: 'ultemp.dat',
			limits: [1],
			format: 'boolean',
			encoding: 'binary',
			position: 12
		},
		status13: {
			target: 'ultemp.dat',
			limits: [1],
			format: 'boolean',
			encoding: 'binary',
			position: 13
		},
		status14: {
			target: 'ultemp.dat',
			limits: [1],
			format: 'boolean',
			encoding: 'binary',
			position: 14
		},
		status15: {
			target: 'ultemp.dat',
			limits: [1],
			format: 'boolean',
			encoding: 'binary',
			position: 15
		},
		status16: {
			target: 'ultemp.dat',
			limits: [1],
			format: 'boolean',
			encoding: 'binary',
			position: 16
		},
		status17: {
			target: 'ultemp.dat',
			limits: [1],
			format: 'boolean',
			encoding: 'binary',
			position: 17
		}
	}
};

MooCS.writeDict462 = {
	
};