/*	core.js
	2010-10-19
	Carson Christian
	
	Provides the translation dictionary for interpereting the BCS values.
*/
/*global BCS */
BCS.Comm.$readables = {
	psStatus: {
		target: 'ultemp.dat',
		cacheable: false,
		structure: {
			ps0: {
				limits: [0],
				format: 'boolean',
				encoding: 'binary',
				position: 0
			},
			ps1: {
				limits: [0],
				format: 'boolean',
				encoding: 'binary',
				position: 1
			},
			ps2: {
				limits: [0],
				format: 'boolean',
				encoding: 'binary',
				position: 2
			},
			ps3: {
				limits: [0],
				format: 'boolean',
				encoding: 'binary',
				position: 3
			},
			ps4: {
				limits: [0],
				format: 'boolean',
				encoding: 'binary',
				position: 4
			},
			ps5: {
				limits: [0],
				format: 'boolean',
				encoding: 'binary',
				position: 5
			},
			ps6: {
				limits: [0],
				format: 'boolean',
				encoding: 'binary',
				position: 6
			},
			ps7: {
				limits: [0],
				format: 'boolean',
				encoding: 'binary',
				position: 7
			}
		}
	},
	outputStatus: {
		target: 'ultemp.dat',
		cacheable: false,
		structure: {
			out0: {
				limits: [1],
				format: 'boolean',
				encoding: 'binary',
				position: 0
			},
			out1: {
				limits: [1],
				format: 'boolean',
				encoding: 'binary',
				position: 1
			},
			out2: {
				limits: [1],
				format: 'boolean',
				encoding: 'binary',
				position: 2
			},
			out3: {
				limits: [1],
				format: 'boolean',
				encoding: 'binary',
				position: 3
			},
			out4: {
				limits: [1],
				format: 'boolean',
				encoding: 'binary',
				position: 4
			},
			out5: {
				limits: [1],
				format: 'boolean',
				encoding: 'binary',
				position: 5
			},
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
			},
			out18: {
				limits: [1],
				format: 'boolean',
				encoding: 'binary',
				position: 18
			}
		}
	},
	inputStatus: {
		target: 'ultemp.dat',
		cacheable: false,
		structure: {
			in0: {
				limits: [2],
				format: 'boolean',
				encoding: 'binary',
				position: 0
			},
			in1: {
				limits: [2],
				format: 'boolean',
				encoding: 'binary',
				position: 1
			},
			in2: {
				limits: [2],
				format: 'boolean',
				encoding: 'binary',
				position: 2
			},
			in3: {
				limits: [2],
				format: 'boolean',
				encoding: 'binary',
				position: 3
			}// ,
			// 			in4: {
			// 				limits: [2],
			// 				format: 'boolean',
			// 				encoding: 'binary',
			// 				position: 4
			// 			},
			// 			in5: {
			// 				limits: [2],
			// 				format: 'boolean',
			// 				encoding: 'binary',
			// 				position: 5
			// 			},
			// 			in6: {
			// 				limits: [2],
			// 				format: 'boolean',
			// 				encoding: 'binary',
			// 				position: 6
			// 			},
			// 			in7: {
			// 				limits: [2],
			// 				format: 'boolean',
			// 				encoding: 'binary',
			// 				position: 7
			// 			}
		}
	},
	temp: {
		target: 'ultemp.dat',
		cacheable: false,
		structure: {
			probe0: {
				limits: [3],
				format: 'number',
				encoding: 'fahrenheit-10'
			},
			probe1: {
				limits: [4],
				format: 'number',
				encoding: 'fahrenheit-10'
			},
			probe2: {
				limits: [5],
				format: 'number',
				encoding: 'fahrenheit-10'
			},
			probe3: {
				limits: [6],
				format: 'number',
				encoding: 'fahrenheit-10'
			}// ,
			// 			probe4: {
			// 				limits: [7],
			// 				format: 'number',
			// 				encoding: 'fahrenheit-10'
			// 			},
			// 			probe5: {
			// 				limits: [8],
			// 				format: 'number',
			// 				encoding: 'fahrenheit-10'
			// 			},
			// 			probe6: {
			// 				limits: [9],
			// 				format: 'number',
			// 				encoding: 'fahrenheit-10'
			// 			},
			// 			probe7: {
			// 				limits: [10],
			// 				format: 'number',
			// 				encoding: 'fahrenheit-10'
			// 			}
		}
	},
	setpoint: {
		target: 'ultemp.dat',
		cacheable: false,
		structure: {
			probe0: {
				limits: [11],
				format: 'number',
				encoding: 'fahrenheit-10'
			},
			probe1: {
				limits: [12],
				format: 'number',
				encoding: 'fahrenheit-10'
			},
			probe2: {
				limits: [13],
				format: 'number',
				encoding: 'fahrenheit-10'
			},
			probe3: {
				limits: [14],
				format: 'number',
				encoding: 'fahrenheit-10'
			}// ,
			// 			probe4: {
			// 				limits: [7],
			// 				format: 'number',
			// 				encoding: 'fahrenheit-10'
			// 			},
			// 			probe5: {
			// 				limits: [8],
			// 				format: 'number',
			// 				encoding: 'fahrenheit-10'
			// 			},
			// 			probe6: {
			// 				limits: [9],
			// 				format: 'number',
			// 				encoding: 'fahrenheit-10'
			// 			},
			// 			probe7: {
			// 				limits: [10],
			// 				format: 'number',
			// 				encoding: 'fahrenheit-10'
			// 			}
		}
	},
	psNames: {
		target: 'sysname.dat',
		cacheable: true,
		structure: {
			ps0: {
				limits: [1],
				format: 'string'
			},
			ps1: {
				limits: [2],
				format: 'string'
			},
			ps2: {
				limits: [3],
				format: 'string'
			},
			ps3: {
				limits: [4],
				format: 'string'
			}
		}
	},
	ps0Names: {
		target: 'sysname.dat',
		cacheable: true,
		structure: {
			state0: {
				limits: [5],
				format: 'string'
			},
			state1: {
				limits: [6],
				format: 'string'
			},
			state2: {
				limits: [7],
				format: 'string'
			},
			state3: {
				limits: [8],
				format: 'string'
			},
			state4: {
				limits: [9],
				format: 'string'
			},
			state5: {
				limits: [10],
				format: 'string'
			},
			state6: {
				limits: [11],
				format: 'string'
			},
			state7: {
				limits: [12],
				format: 'string'
			}
		}
	},
	ps0WinNames: {
		target: 'sysname.dat',
		cacheable: true,
		structure: {
			webInput0: {
				limits: [47],
				format: 'string'
			},
			webInput1: {
				limits: [48],
				format: 'string'
			},
			webInput2: {
				limits: [49],
				format: 'string'
			},
			webInput3: {
				limits: [50],
				format: 'string'
			}
		}
	},
	ps0TimerNames: {
		target: 'sysname.dat',
		cacheable: true,
		structure: {
			timer0: {
				limits: [67],
				format: 'string'
			},
			timer1: {
				limits: [68],
				format: 'string'
			},
			timer2: {
				limits: [69],
				format: 'string'
			},
			timer3: {
				limits: [70],
				format: 'string'
			}
		}
	},
	ps1Names: {
		target: 'sysname.dat',
		cacheable: true,
		structure: {
			state0: {
				limits: [13],
				format: 'string'
			},
			state1: {
				limits: [14],
				format: 'string'
			},
			state2: {
				limits: [15],
				format: 'string'
			},
			state3: {
				limits: [16],
				format: 'string'
			},
			state4: {
				limits: [17],
				format: 'string'
			},
			state5: {
				limits: [18],
				format: 'string'
			},
			state6: {
				limits: [19],
				format: 'string'
			},
			state7: {
				limits: [20],
				format: 'string'
			}
		}
	},
	ps1WinNames: {
		target: 'sysname.dat',
		cacheable: true,
		structure: {
			webInput0: {
				limits: [51],
				format: 'string'
			},
			webInput1: {
				limits: [52],
				format: 'string'
			},
			webInput2: {
				limits: [53],
				format: 'string'
			},
			webInput3: {
				limits: [54],
				format: 'string'
			}
		}
	},
	ps1TimerNames: {
		target: 'sysname.dat',
		cacheable: true,
		structure: {
			timer0: {
				limits: [71],
				format: 'string'
			},
			timer1: {
				limits: [72],
				format: 'string'
			},
			timer2: {
				limits: [73],
				format: 'string'
			},
			timer3: {
				limits: [74],
				format: 'string'
			}
		}
	},
	ps2Names: {
		target: 'sysname.dat',
		cacheable: true,
		structure: {
			state0: {
				limits: [21],
				format: 'string'
			},
			state1: {
				limits: [22],
				format: 'string'
			},
			state2: {
				limits: [23],
				format: 'string'
			},
			state3: {
				limits: [24],
				format: 'string'
			},
			state4: {
				limits: [25],
				format: 'string'
			},
			state5: {
				limits: [26],
				format: 'string'
			},
			state6: {
				limits: [27],
				format: 'string'
			},
			state7: {
				limits: [28],
				format: 'string'
			}
		}
	},
	ps2WinNames: {
		target: 'sysname.dat',
		cacheable: true,
		structure: {
			webInput0: {
				limits: [55],
				format: 'string'
			},
			webInput1: {
				limits: [56],
				format: 'string'
			},
			webInput2: {
				limits: [57],
				format: 'string'
			},
			webInput3: {
				limits: [58],
				format: 'string'
			}
		}
	},
	ps2TimerNames: {
		target: 'sysname.dat',
		cacheable: true,
		structure: {
			timer0: {
				limits: [75],
				format: 'string'
			},
			timer1: {
				limits: [76],
				format: 'string'
			},
			timer2: {
				limits: [77],
				format: 'string'
			},
			timer3: {
				limits: [78],
				format: 'string'
			}
		}
	},
	ps3Names: {
		target: 'sysname.dat',
		cacheable: true,
		structure: {
			state0: {
				limits: [29],
				format: 'string'
			},
			state1: {
				limits: [30],
				format: 'string'
			},
			state2: {
				limits: [31],
				format: 'string'
			},
			state3: {
				limits: [32],
				format: 'string'
			},
			state4: {
				limits: [33],
				format: 'string'
			},
			state5: {
				limits: [34],
				format: 'string'
			},
			state6: {
				limits: [35],
				format: 'string'
			},
			state7: {
				limits: [36],
				format: 'string'
			}
		}
	},
	ps3WinNames: {
		target: 'sysname.dat',
		cacheable: true,
		structure: {
			webInput0: {
				limits: [59],
				format: 'string'
			},
			webInput1: {
				limits: [60],
				format: 'string'
			},
			webInput2: {
				limits: [61],
				format: 'string'
			},
			webInput3: {
				limits: [62],
				format: 'string'
			}
		}
	},
	ps3TimerNames: {
		target: 'sysname.dat',
		cacheable: true,
		structure: {
			timer0: {
				limits: [79],
				format: 'string'
			},
			timer1: {
				limits: [80],
				format: 'string'
			},
			timer2: {
				limits: [81],
				format: 'string'
			},
			timer3: {
				limits: [82],
				format: 'string'
			}
		}
	},
	probeNames: {
		target: 'sysname.dat',
		cacheable: true,
		structure: {
			0: {
				limits: [63],
				format: 'string'
			},
			1: {
				limits: [64],
				format: 'string'
			},
			2: {
				limits: [65],
				format: 'string'
			},
			3: {
				limits: [66],
				format: 'string'
			}
		}
	},
	dinNames: {
		target: 'sysname.dat',
		cacheable: true,
		structure: {
			0: {
				limits: [43],
				format: 'string'
			},
			1: {
				limits: [44],
				format: 'string'
			},
			2: {
				limits: [45],
				format: 'string'
			},
			3: {
				limits: [46],
				format: 'string'
			}
		}
	},
	outputNames: {
		target: 'sysname.dat',
		cacheable: true,
		structure: {
			0: {
				limits: [37],
				format: 'string'
			},
			1: {
				limits: [38],
				format: 'string'
			},
			2: {
				limits: [39],
				format: 'string'
			},
			3: {
				limits: [40],
				format: 'string'
			},
			4: {
				limits: [41],
				format: 'string'
			},
			5: {
				limits: [42],
				format: 'string'
			}
		}
	},
	network: {
		target: 'ipaddr.dat',
		cacheable: true,
		structure: {
			staticAddress: {
				limits: [0,3],
				format: 'string',
				join: '.'
			},
			subnetMask: {
				limits: [4,7],
				format: 'string',
				join: '.'
			},
			gateway: {
				limits: [8,11],
				format: 'string',
				join: '.'
			},
			MAC: {
				limits: [12,17],
				format: 'string',
				encoding: 'hex',
				join: ':'
			},
			currentIP: {
				limits: [18,21],
				format: 'string',
				join: '.'
			},
			DHCPEnabled: {
				limits: [22],
				format: 'boolean'
			}
		}
	},
	networkStatistics: {
		target: 'enetlog.dat',
		cacheable: false,
		structure: {
			packetsSent: {
				limits: [0],
				format: 'number'
			},
			packetsReceived: {
				limits: [2],
				format: 'number'
			}
		}
	},
	firmware: {
		target: 'sysname.dat',
		cacheable: true,
		structure: {
			version: {
				limits: [0],
				format: 'string'
			}
		}
	}
};

BCS.Comm.$writables = {
	network: {
		target: 'ipaddr.dat',
		arguments: 'data&p=0&s=0&',
		structure: {
			
		}
	}
};

BCS.Comm.list = function (area) {
	// PUBLIC
	// Return an Object of the valid dictionary entries for read or write.
	// Object format is:
	// 	{ section: [key, key, key, ...] }
	// area: 'read' or 'write'
	var result = {};
	
	Object.each(this[(area === 'read') ? '$readables' : '$writables'], function (members, key) {
		var what = [];
		
		result[key] = what;
		Object.each(members.structure, function (detail, key) {
			what.push(key);
		});
	});
	return result;
};