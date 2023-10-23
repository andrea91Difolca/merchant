import Image from 'next/image'


class Environment {
    readonly name : string;
    readonly svgName: string;
    readonly svgPath : string;
    readonly color :string;

    constructor(name: string, svgLink: string, color: string) {
        this.name = name;
        this.svgName = svgLink;
        this.svgPath = "environment/"+this.svgName+".svg";
        this.color = color;
    }
}

const Environments : Environment[] = [
    new Environment("sun"       , "sun",        "yellow"),
    new Environment("mountain"  , "mountain",   "brown"),
    new Environment("city"      , "sword",      "red"),
    new Environment("wild"      , "forest",     "green")
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
    return Environments.filter (elem => {
        return FirstLetterIsIn(elem.name, selectors);
    }).map( envElem => envElem.color);
    ; 
}