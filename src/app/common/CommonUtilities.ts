
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
    const sum = series.reduce((pValue, cValue, index) => {
        const precValue = pValue ?? 0;
        return precValue+cValue;
    });
    const res = sum/series.length;
    return res;
}

export function GetSum(numberArray : number[]) : number {
    return numberArray.reduce((pN, cN) => (pN ?? 0) + cN);
}

export function GetMax(numberArray : number[]) : number {
    return numberArray.reduce((pN, cN) => pN && (pN > cN) ? pN : cN);
}

function CopyArray<T>(tArray : T[]) : T[] {
    return tArray.map(value => value);
}

function AddOneSpaceForAllPermutation(cPermutation : string[], combination : string[]) : string[][] {
    const Permutations : string[][] = [];
    for (let index=0; index < combination.length; index++) {
        const toPushvalue = combination[index];
        if (toPushvalue == "" || !cPermutation.includes(toPushvalue)) {
            const NewPermutation = CopyArray(cPermutation);
            NewPermutation.push(toPushvalue);
            Permutations.push(NewPermutation); 
        }
    }
    return Permutations;
}

export function PermutationFromCombination(combination: string[], availableSpace : number) {
    combination.push("");
    let rPermutation : string[][] = []
    rPermutation.push([]);
    for(let space = 0; space < availableSpace; space++) {
        const CurrentPermutations : string[][] = [];
        for (let pIndex = 0; pIndex < rPermutation.length; pIndex++) {
            CurrentPermutations.concat(AddOneSpaceForAllPermutation(rPermutation[pIndex], combination));
        }
        rPermutation = CurrentPermutations;
    }
}