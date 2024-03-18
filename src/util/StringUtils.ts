function ReduceConcat(pr :string, cr: string, separator : string) : string {
    return pr ? pr+separator+cr : cr
}

export function ArrayToString(arr : string[], separator:string ) :string {
    if ( !arr || arr.length === 0) {
        return "";
    }
    return arr.reduce((pr,cr) => ReduceConcat(pr,cr, separator));
}