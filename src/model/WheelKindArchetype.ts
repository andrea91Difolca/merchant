const WheelKind = {A: "A", B:"B", C:"C"};

export default class WheelKindArchetype {
    readonly kind : "A" | "B" | "C";
    constructor (kindP : string) {
        switch (kindP) {
            case "A" : case "B" : case "C":
            this.kind = kindP;
            default : throw Error("try to create a not valid kind");
        }
    }
}