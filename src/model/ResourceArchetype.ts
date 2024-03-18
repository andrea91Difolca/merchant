export const RESOURCE_ARCHETYPES : string [] = [
    "wood",
    "food",
    "water",
    "stone",
    "spice",
    "silk"
];

export class ResourceArchetype {
    readonly name: string;
    readonly className: string;

    public constructor(name:string) {
        this.name = name;
        this.className = "resource-"+ this.name + "-color";
    }

    static GetInstance = CreateResource
}

export default function CreateResource(name: string) {
    var PossibleFind = RESOURCE_ARCHETYPES.find( function(elem) {
        return elem === name.toLocaleLowerCase();
    });

    if (!PossibleFind) {
        throw Error("Archetype does not exists");
    }
    return new ResourceArchetype(PossibleFind);
}

