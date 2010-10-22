/*	core.js
	2010-10-19
	Carson Christian
	
	Provides the translation dictionary for interpereting the BCS values.
*/
/*global BCS */
BCS.Comm.$readables = {
	firmware: {
		target: 'sysname.dat',
		cacheable: true,
		structure: {
			version: {
				limits: [0],
				format: 'string'
			}
		}
	},
	process: {
		target: 'sysname.dat',
		cacheable: true,
		structure: {
			'0': {
				limits: [1],
				format: 'string'
			},
			'1': {
				limits: [2],
				format: 'string'
			},
			'2': {
				limits: [3],
				format: 'string'
			},
			'3': {
				limits: [4],
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
				format: 'hex',
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
				format: 'string'
			},
			packetsReceived: {
				limits: [2],
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