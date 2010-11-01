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
	probes: {
		4: {
			target: 'sysname.dat',
			limits: [85],
			format: 'string'
		},
		5: {
			target: 'sysname.dat',
			limits: [86],
			format: 'string'
		},
		6: {
			target: 'sysname.dat',
			limits: [87],
			format: 'string'
		},
		7: {
			target: 'sysname.dat',
			limits: [88],
			format: 'string'
		}
	},
	dins: {
		4: {
			target: 'sysname.dat',
			limits: [89],
			format: 'string'
		},
		5: {
			target: 'sysname.dat',
			limits: [90],
			format: 'string'
		},
		6: {
			target: 'sysname.dat',
			limits: [91],
			format: 'string'
		},
		7: {
			target: 'sysname.dat',
			limits: [92],
			format: 'string'
		}
	},
	outputs: {
		6: {
			target: 'sysname.dat',
			limits: [93],
			format: 'string'
		},
		7: {
			target: 'sysname.dat',
			limits: [94],
			format: 'string'
		},
		8: {
			target: 'sysname.dat',
			limits: [95],
			format: 'string'
		},
		9: {
			target: 'sysname.dat',
			limits: [96],
			format: 'string'
		},
		10: {
			target: 'sysname.dat',
			limits: [97],
			format: 'string'
		},
		11: {
			target: 'sysname.dat',
			limits: [98],
			format: 'string'
		},
		12: {
			target: 'sysname.dat',
			limits: [99],
			format: 'string'
		},
		13: {
			target: 'sysname.dat',
			limits: [100],
			format: 'string'
		},
		14: {
			target: 'sysname.dat',
			limits: [101],
			format: 'string'
		},
		15: {
			target: 'sysname.dat',
			limits: [102],
			format: 'string'
		},
		16: {
			target: 'sysname.dat',
			limits: [103],
			format: 'string'
		},
		17: {
			target: 'sysname.dat',
			limits: [104],
			format: 'string'
		}
	},
	outputStatus: {
		out6: {
			target: 'ultemp.dat',
			limits: [1],
			format: 'boolean',
			encoding: 'binary',
			position: 6
		},
		out7: {
			target: 'ultemp.dat',
			limits: [1],
			format: 'boolean',
			encoding: 'binary',
			position: 7
		},
		out8: {
			target: 'ultemp.dat',
			limits: [1],
			format: 'boolean',
			encoding: 'binary',
			position: 8
		},
		out9: {
			target: 'ultemp.dat',
			limits: [1],
			format: 'boolean',
			encoding: 'binary',
			position: 9
		},
		out10: {
			target: 'ultemp.dat',
			limits: [1],
			format: 'boolean',
			encoding: 'binary',
			position: 10
		},
		out11: {
			target: 'ultemp.dat',
			limits: [1],
			format: 'boolean',
			encoding: 'binary',
			position: 11
		},
		out12: {
			target: 'ultemp.dat',
			limits: [1],
			format: 'boolean',
			encoding: 'binary',
			position: 12
		},
		out13: {
			target: 'ultemp.dat',
			limits: [1],
			format: 'boolean',
			encoding: 'binary',
			position: 13
		},
		out14: {
			target: 'ultemp.dat',
			limits: [1],
			format: 'boolean',
			encoding: 'binary',
			position: 14
		},
		out15: {
			target: 'ultemp.dat',
			limits: [1],
			format: 'boolean',
			encoding: 'binary',
			position: 15
		},
		out16: {
			target: 'ultemp.dat',
			limits: [1],
			format: 'boolean',
			encoding: 'binary',
			position: 16
		},
		out17: {
			target: 'ultemp.dat',
			limits: [1],
			format: 'boolean',
			encoding: 'binary',
			position: 17
		}
	},
	inputStatus: {
		in4: {
			target: 'ultemp.dat',
			limits: [2],
			format: 'boolean',
			encoding: 'binary',
			position: 4
		},
		in5: {
			target: 'ultemp.dat',
			limits: [2],
			format: 'boolean',
			encoding: 'binary',
			position: 5
		},
		in6: {
			target: 'ultemp.dat',
			limits: [2],
			format: 'boolean',
			encoding: 'binary',
			position: 6
		},
		in7: {
			target: 'ultemp.dat',
			limits: [2],
			format: 'boolean',
			encoding: 'binary',
			position: 7
		}
	},
	temp: {
		probe4: {
			target: 'ultemp.dat',
			limits: [7],
			format: 'number',
			encoding: 'temperature-10'
		},
		probe5: {
			target: 'ultemp.dat',
			limits: [8],
			format: 'number',
			encoding: 'temperature-10'
		},
		probe6: {
			target: 'ultemp.dat',
			limits: [9],
			format: 'number',
			encoding: 'temperature-10'
		},
		probe7: {
			target: 'ultemp.dat',
			limits: [10],
			format: 'number',
			encoding: 'temperature-10'
		}
	},
	setpoint: {
		probe4: {
			target: 'ultemp.dat',
			limits: [7],
			format: 'number',
			encoding: 'temperature-10'
		},
		probe5: {
			target: 'ultemp.dat',
			limits: [8],
			format: 'number',
			encoding: 'temperature-10'
		},
		probe6: {
			target: 'ultemp.dat',
			limits: [9],
			format: 'number',
			encoding: 'temperature-10'
		},
		probe7: {
			target: 'ultemp.dat',
			limits: [10],
			format: 'number',
			encoding: 'temperature-10'
		}
	}
};

MooCS.writeDict462 = {
	
};