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
	probeNames: {
		target: 'sysname.dat',
		cacheable: true,
		structure: {
			4: {
				limits: [85],
				format: 'string'
			},
			5: {
				limits: [86],
				format: 'string'
			},
			6: {
				limits: [87],
				format: 'string'
			},
			7: {
				limits: [88],
				format: 'string'
			}
		}
	},
	dinNames: {
		target: 'sysname.dat',
		cacheable: true,
		structure: {
			4: {
				limits: [89],
				format: 'string'
			},
			5: {
				limits: [90],
				format: 'string'
			},
			6: {
				limits: [91],
				format: 'string'
			},
			7: {
				limits: [92],
				format: 'string'
			}
		}
	},
	outputNames: {
		target: 'sysname.dat',
		cacheable: true,
		structure: {
			6: {
				limits: [93],
				format: 'string'
			},
			7: {
				limits: [94],
				format: 'string'
			},
			8: {
				limits: [95],
				format: 'string'
			},
			9: {
				limits: [96],
				format: 'string'
			},
			10: {
				limits: [97],
				format: 'string'
			},
			11: {
				limits: [98],
				format: 'string'
			},
			12: {
				limits: [99],
				format: 'string'
			},
			13: {
				limits: [100],
				format: 'string'
			},
			14: {
				limits: [101],
				format: 'string'
			},
			15: {
				limits: [102],
				format: 'string'
			},
			16: {
				limits: [103],
				format: 'string'
			},
			17: {
				limits: [104],
				format: 'string'
			}
		}
	},
	outputStatus: {
		target: 'ultemp.dat',
		cacheable: false,
		structure: {
			out6: {
				limits: [1],
				format: 'boolean',
				encoding: 'binary',
				position: 6
			},
			out7: {
				limits: [1],
				format: 'boolean',
				encoding: 'binary',
				position: 7
			},
			out8: {
				limits: [1],
				format: 'boolean',
				encoding: 'binary',
				position: 8
			},
			out9: {
				limits: [1],
				format: 'boolean',
				encoding: 'binary',
				position: 9
			},
			out10: {
				limits: [1],
				format: 'boolean',
				encoding: 'binary',
				position: 10
			},
			out11: {
				limits: [1],
				format: 'boolean',
				encoding: 'binary',
				position: 11
			},
			out12: {
				limits: [1],
				format: 'boolean',
				encoding: 'binary',
				position: 12
			},
			out13: {
				limits: [1],
				format: 'boolean',
				encoding: 'binary',
				position: 13
			},
			out14: {
				limits: [1],
				format: 'boolean',
				encoding: 'binary',
				position: 14
			},
			out15: {
				limits: [1],
				format: 'boolean',
				encoding: 'binary',
				position: 15
			},
			out16: {
				limits: [1],
				format: 'boolean',
				encoding: 'binary',
				position: 16
			},
			out17: {
				limits: [1],
				format: 'boolean',
				encoding: 'binary',
				position: 17
			}
		}
	},
	inputStatus: {
		target: 'ultemp.dat',
		cacheable: false,
		structure: {
			in4: {
				limits: [2],
				format: 'boolean',
				encoding: 'binary',
				position: 4
			},
			in5: {
				limits: [2],
				format: 'boolean',
				encoding: 'binary',
				position: 5
			},
			in6: {
				limits: [2],
				format: 'boolean',
				encoding: 'binary',
				position: 6
			},
			in7: {
				limits: [2],
				format: 'boolean',
				encoding: 'binary',
				position: 7
			}
		}
	},
	temp: {
		target: 'ultemp.dat',
		cacheable: false,
		structure: {
			probe4: {
				limits: [7],
				format: 'number',
				encoding: 'temperature-10'
			},
			probe5: {
				limits: [8],
				format: 'number',
				encoding: 'temperature-10'
			},
			probe6: {
				limits: [9],
				format: 'number',
				encoding: 'temperature-10'
			},
			probe7: {
				limits: [10],
				format: 'number',
				encoding: 'temperature-10'
			}
		}
	},
	setpoint: {
		target: 'ultemp.dat',
		cacheable: false,
		structure: {
			probe4: {
				limits: [7],
				format: 'number',
				encoding: 'temperature-10'
			},
			probe5: {
				limits: [8],
				format: 'number',
				encoding: 'temperature-10'
			},
			probe6: {
				limits: [9],
				format: 'number',
				encoding: 'temperature-10'
			},
			probe7: {
				limits: [10],
				format: 'number',
				encoding: 'temperature-10'
			}
		}
	}
};

MooCS.writeDict462 = {
	
};