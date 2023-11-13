// a 6 si puù solo vendere a 0 si può solo acquistare
// Da A a E, da A conviene acquistare da E conviene vendere
const wheels = 
{
	'water': {
		'A' : {'wheel':[0,0,0,1,1,1],'size' : 2}, // 0,3
		'0' : {'wheel':[1,1,1,2,2,2],'size' : 2},//4
		'C' : {'wheel':[2,2,3,3,4,4],'size' : 2} // 6,3,2,3,0
	},
	'food' : { 
		'A' : {'wheel': [0,0,1,1,2,2],'size' : 3}, //0,0,0
		'B' : {'wheel': [1,1,1,2,2,3],'size' : 2}, //0
		'0' : {'wheel': [1,1,2,2,3,4],'size' : 2}, //1,3,3
		'C' : {'wheel': [2,2,3,3,4,4],'size' : 1}  //2,3,3,4,3,1
	},
	'wood' : {
		'A' : {'wheel': [1,1,1,2,2,2],'size' : 4}, //0
		'B' : {'wheel': [1,1,2,2,3,3],'size' : 3}, //2,3,0
		'0' : {'wheel': [1,2,2,3,3,4],'size' : 4}, //3
		'C' : {'wheel': [2,2,3,3,4,4],'size' : 4}, //4
		'D' : {'wheel': [3,3,4,4,5,5],'size' : 4}  //6,6,6,6,6
	},
	'stone' : {
		'A' : {'wheel': [1,1,2,2,3,3],'size' : 5}, //5 , 0
		'B' : {'wheel': [2,2,3,3,4,4],'size' : 5}, //6 , 6
		'0' : {'wheel': [2,3,3,4,4,5],'size' : 4}, 
		'C' : {'wheel': [3,3,4,4,5,6],'size' : 3}, //5, 6
		'D' : {'wheel': [4,4,5,6,7,8],'size' : 3}  //6, 6, 5
	},
	'spice'	: {
		'A' : {'wheel': [1,1,1,2,2,3],'size' : 3}, // 0
		'B' : {'wheel': [2,2,3,3,3,4],'size' : 1}, // 6
		'C' : {'wheel': [4,4,5,5,6,6],'size' : 3}, // 5, 6
		'D' : {'wheel': [4,5,6,7,8,9],'size' : 3}, // 5, 6
		'E' : {'wheel': [6,7,8,8,9,9],'size' : 3}  // 6
	},
	'silk'	: {
		'A' : {'wheel': [2,2,3,3,4,4],'size' : 4},		// 4
		'B' : {'wheel': [3,3,4,4,5,5],'size' : 3},		//
		'C' : {'wheel': [4,4,5,5,6,6],'size' : 2},		// 3,
		'D' : {'wheel': [4,4,5,6,7,7],'size' : 5},		//
		'E' : {'wheel': [5,6,7,8,9,10],'size' : 5},		// 6
		'F' : {'wheel': [6,8,8,10,12,12],'size' : 2}	// 6
	}
};


interface Resource2Wheel {
    res : string,
    wType : string
}

class GenericWheel {
    resources : Resource2Wheel[] = [];
    prices :  number[] = [];

    constructor(prices: number[]){
        this.prices = prices;
    };

    AddResource(resource: string, wType: string) {
        this.resources.push({res:resource, wType: wType});
    }
}

export function GetDefaultSizeForWheel(resource :string, wheel: string) {
    const resourcers = Object.keys(wheels);
    const entries = Object.entries(wheels);

    const foundedEntry = entries.find(entry => {
        return entry[0] === resource;
    });

    if (foundedEntry) {
        const entrieswType = Object.entries(foundedEntry[1]);

        const foundwheel = entrieswType.find(value => {
            return value[0] === wheel;
        });
        if(foundwheel) return foundwheel[1].size;
    }
}
