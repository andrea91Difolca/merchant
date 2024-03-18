import { GetSum } from "../../util/ListUtils";
import { PotentialPlaceCard } from "./PotentialPlaceCard";
import { WheelKind } from "../../model/WheelDescriptor";

interface ObstacleLimit  {
    [resource: string] : [number, number]
}

const ObstacleLimits : ObstacleLimit = {
    "food"  : [3.83,    7],
    "wood"  : [3.83,    14],
    "stone" : [3.83,    7],
    "water" : [2.17,    26],
    "spice" : [2,       33],
    "silk"  : [2.17,    12],
    ""      : [3.83,     0.0] 
}

function WhicOneFirst (a : number, b:number) {
    return a == 0 ? b : a;
}

function TransformInString (a: PotentialPlaceCard, maxValue : number) : string {
    return a.resourceIncomes.map(elem => elem.wheel.resource)
        .reduce((prev, curr, index) => {
            if (index > maxValue) {
                return prev;
            }
            return prev ? prev + curr : curr
        });
}

function SortByDirect(a: PotentialPlaceCard, b:PotentialPlaceCard ) : number {
    
    const maxValue = 0;
    const aresource = TransformInString(a,maxValue)
    const bresource = TransformInString(b,maxValue)
    if(aresource == bresource) {
        const potential =  b.potentialIncome - a.potentialIncome;
        const direct = b.directIncome - a.directIncome;
        return WhicOneFirst(direct, potential);
    } else {
        return aresource > bresource ? -1: 1;
    }
}


function IsLessThanAveragePotentialIncome(elem:PotentialPlaceCard) :boolean {
    const Aresource =  elem.resourceIncomes.find(r1 => r1.wheel.kind === "A");
    const resourceName = Aresource?.wheel.resource ?? "";
    
    const [avgIncome, minPotential] = ObstacleLimits[resourceName];
    return 1 == 1 
    && elem.potentialIncome <= minPotential 
    && elem.directIncome >= avgIncome;
}

function HowManyKind(elem :PotentialPlaceCard, _kind : string) :number {
    const onlyIfkind =elem.resourceIncomes.map( r1 =>{
        const w = r1.wheel;
        return w.kind == _kind && w.resource != "" ? 1 : 0; 
    })
    return GetSum(onlyIfkind);
}


export function filterObstacle(resource : string, allPermutation :  PotentialPlaceCard[]) {
    return allPermutation
    .filter(elem => elem.resourceIncomes.filter(r1 => r1.wheel.resource === "").length <= 1)
    //.filter(elem => !elem.resourceIncomes.find(r1 => r1.wheel.resource == "spice"))
    //.filter(IsLessThanAveragePotentialIncome)
    .filter(elem => (HowManyKind(elem, WheelKind.A) === 1 && HowManyKind(elem,WheelKind.B) === 2 && HowManyKind(elem,WheelKind.C) === 1)
     || (HowManyKind(elem, WheelKind.A) === 0 && HowManyKind(elem,WheelKind.B) >= 0 && HowManyKind(elem,WheelKind.C) >= 1)
     || (HowManyKind(elem, WheelKind.A) >= 0 && HowManyKind(elem,WheelKind.B) >= 0 && HowManyKind(elem,WheelKind.C) === 0)
    ).sort(SortByDirect);
}

function SortByPotentialWithBetterIncome(a: PotentialPlaceCard, b:PotentialPlaceCard ) : number {
    const potential = b.IsPotentiallyUseful() - a.IsPotentiallyUseful();
    const better = potential == 0 ? b.potentialIncome - a.potentialIncome : potential;
    return better;
}

export function filterProducer(resource : string, allPermutation :  PotentialPlaceCard[]) {
    return allPermutation
    .filter(elem => elem.resourceIncomes.map(res => res.wheel.resource).includes(resource))
    .filter(elem => elem.resourceIncomes.find(ri => ri.wheel.kind == "A")?.wheel.resource == resource)
    .sort(SortByPotentialWithBetterIncome)
}
