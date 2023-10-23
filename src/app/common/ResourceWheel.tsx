
const wheels = 
{
	'water': {
		'A' : {'wheel':[0,0,0,1,1,1],'size' : 2},
		'B' : {'wheel':[0,0,1,1,1,2],'size' : 2},
		'0' : {'wheel':[1,1,1,2,2,2],'size' : 2},
		'C' : {'wheel':[2,2,3,3,4,4],'size' : 2}
	},
	'food' : { 
		'A' : {'wheel': [1,1,1,1,2,2],'size' : 3},
		'B' : {'wheel': [1,1,1,2,2,3],'size' : 2},
		'0' : {'wheel': [1,1,2,2,3,4],'size' : 2},
		'C' : {'wheel': [2,2,3,3,4,4],'size' : 1}
	},
	'wood' : {
		'A' : {'wheel': [1,1,1,2,2,2],'size' : 4},
		'B' : {'wheel': [1,1,2,2,3,3],'size' : 3},
		'0' : {'wheel': [1,2,2,3,3,4],'size' : 4},
		'C' : {'wheel': [2,2,3,3,4,4],'size' : 4},
		'D' : {'wheel': [3,3,4,4,5,5],'size' : 4}
	},
	'stone' : {
		'A' : {'wheel': [1,1,2,2,3,3],'size' : 5},
		'B' : {'wheel': [2,2,3,3,4,4],'size' : 5},
		'0' : {'wheel': [2,3,3,4,4,5],'size' : 4},
		'C' : {'wheel': [3,3,4,4,5,6],'size' : 3},
		'D' : {'wheel': [4,4,5,6,7,8],'size' : 3}
	},
	'spice'	: {
		'A' : {'wheel': [1,1,1,2,2,3],'size' : 3},
		'B' : {'wheel': [2,2,3,3,3,4],'size' : 1},
		'C' : {'wheel': [4,4,5,5,6,6],'size' : 3},
		'D' : {'wheel': [4,5,6,7,8,9],'size' : 3},
		'E' : {'wheel': [6,7,8,8,9,9],'size' : 3}
	},
	'silk'	: {
		'A' : {'wheel': [2,2,3,3,4,4],'size' : 4},
		'B' : {'wheel': [3,3,4,4,5,5],'size' : 3},
		'C' : {'wheel': [4,4,5,5,6,6],'size' : 2},
		'D' : {'wheel': [4,4,5,6,7,7],'size' : 5},
		'E' : {'wheel': [5,6,7,8,9,10],'size' : 5},
		'F' : {'wheel': [6,8,8,10,12,12],'size' : 2}
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
