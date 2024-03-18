import { RESOURCE_ARCHETYPES } from "../model/ResourceArchetype";

export function SplitArray<T>(input : T[], spacing: number)
{
    let output = [];

    for (let i = 0; i < input.length; i += spacing)
    {
        output[output.length] = input.slice(i, i + spacing);
    }

    return output;
}

export function GetAvg (series : number[]) : number {
    if (!series || series.length === 0) return 0;
    const sum = series.reduce((pValue, cValue) => 
        pValue+cValue, 0);
    const res = sum/series.length;
    return res;
}

export function GetSum(numberArray : number[]) : number {
    return !numberArray || numberArray.length === 0  ? 0 : numberArray.reduce((pN, cN) => (pN ?? 0) + cN);
}

export function GetMax(numberArray : number[]) : number {
    return !numberArray || numberArray.length === 0  ? 0 : numberArray.reduce((pN, cN) => pN && (pN > cN) ? pN : cN);
}

function CopyArray<T>(tArray : T[]) : T[] {
    return new Array<T>().concat(tArray);
}

function AddOneSpaceForAllPermutation(cPermutation : string[], combination : string[]) : string[][] {
    const Permutations : string[][] = [];
    for (let index=0; index < combination.length; index++) {
        const toPushvalue = combination[index];
        if (toPushvalue === "" || !cPermutation.includes(toPushvalue)) {
            const NewPermutation = CopyArray(cPermutation);
            NewPermutation.push(toPushvalue);
            Permutations.push(NewPermutation); 
        }
    }
    return Permutations;
}

const RESOURCE_ARCHETYPES_2NUMBERS = (() => {
    const dict : {[i:string] :number} = {};
    RESOURCE_ARCHETYPES.forEach((value, index) => { dict[value]=index});
    return dict;
})();

export function GetUniqueIDForPermutation(allkind: string[], perm: string[]) : number {
    const tier2res = new DictionaryOfQueue<string>();
    
    perm.forEach((elem, index) => tier2res.add(allkind[index], elem));
    const valueReduced = Object.entries(tier2res.dict)
    .map(keyValues => {
        const lastValue = keyValues[1]
            .map((p) =>  RESOURCE_ARCHETYPES_2NUMBERS[p]+1)
            .reduce((p,l) => p*l,1);
        
        switch(keyValues[0]) {
            case 'A':
                return lastValue * 19;
            case 'B':
                return lastValue * 23;
            case 'C':
                return lastValue * 29;
            default :
            return 1;
        }
    }).reduce((f,l) => f+l,0)
    ;
    return valueReduced;
}

export function PermutationFromCombination(_combination: string[], availableSpace : number) {
    const combination = new Array<string>().concat(_combination);
    combination.push("")
    let rPermutation : string[][] = []
    rPermutation.push([]);
    for(let space = 0; space < availableSpace; space++) {
        let CurrentPermutations : string[][] = [];
        for (let pIndex = 0; pIndex < rPermutation.length; pIndex++) {
            CurrentPermutations = CurrentPermutations.concat(AddOneSpaceForAllPermutation(rPermutation[pIndex], combination));
        }
        rPermutation = CurrentPermutations;
    }
    return rPermutation;
}


export class DictionaryOfQueue<T> {
    dict : {[kind : string] : T[]}
    constructor () {
        this.dict = {};
    }
    add(kind: string, obj : T) {
        let list = this.dict[kind];
        if (!list) {
            list = []
            this.dict[kind] = list;
        } 
        list.push(obj);
    }
    get(kind:string)  : T[] {
        const res = this.dict[kind];
        if (!res) throw Error (kind + " was not in the dictionary key.");
        return res;
    }
}

export function GetUniqueObject<T> ( arr : T[], func : (elem: T) => string
) : {[id:string] : T} {
    const objectToSet :  {[id: string] : T } = {};
    arr.forEach(elem => objectToSet[func(elem)] = elem);
    return objectToSet;
}

export function GetUnique<T>( that : T[], func : (elem: T) => string
) : T[] {
    return Object.values(GetUniqueObject<T>(that, func));
}