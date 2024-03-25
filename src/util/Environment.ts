export class Environment {
    readonly name : string;
    readonly color :string;
    readonly cost: number

    constructor(name: string, color: string, _cost:number) {
        this.name = name;
        this.color = color;
        this.cost = _cost;
    }
    GetAcr() {
        return this.name.charAt(0);
    }
}

export const Environments : Environment[] = [
    new Environment("sun"       ,"yellow",  1.5),
    new Environment("mountain"  ,"white",   2),
    new Environment("city"      ,"red",     0.5),
    new Environment("wild"      ,"green",   1)
]

function FindByFirstLetters(toCheck: string, match:string) {
    if (!toCheck || toCheck.length === 0) return false;
    var firstLetter = toCheck.charAt(0);
    return match && firstLetter === match.charAt(0);
}

/**
 * if key is one of the first letter of the selectors is true else is false.
 * @param key 
 * @param selectors 
 * @returns 
 */
function FirstLetterIsIn(key: string, selectors:string[]) : boolean {
    for (let index = 0; index < selectors.length; index++) {
        const element = selectors[index];
        if (FindByFirstLetters(element,key))
            return true;
    }
    return false;
}

export function CreateEnvironment(selector: string) : Environment {
    
    var firstFound = Environments.find(element => {
        var firstLetter = element.name.charAt(0);
        return selector && firstLetter === selector.charAt(0);
    });
    if (firstFound) return firstFound; 
    
    throw new Error("Can not find Environment for "+ selector);
}

export function GetColors(selectors : string[]) : string[] {
    const colors : string[] = [];
    let colorsLenght = 0;
    selectors.length 
    for (let index = 0; colorsLenght != selectors.length && index < Environments.length; index++) {
        const element = Environments[index];
        selectors.filter(selector => FindByFirstLetters(element.name, selector) )
            .forEach(selec => {
                colors.push(element.color);
                colorsLenght++;
            })
    }
    return colors;
}