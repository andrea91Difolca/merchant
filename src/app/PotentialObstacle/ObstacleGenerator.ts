import { GetUnique } from "../../util/ListUtils";
import {CreateEnvironment, Environment, Environments } from "../../util/Environment";
import { CostProps } from "../../component/Cost/Cost";
import { PotentialPlaceCard } from "../Wheel/PotentialPlaceCard";

export function TestObstacle() {
    const sss = new ObstacleCounter(new ObstacleCostCalculator(CreateEnvironment("sun")) )
    sss.put();
    sss.put();
    return [sss];
}

class ObstacleCostCalculator {
    readonly kind : Environment;
    readonly second : Environment | undefined;
    constructor( _kind: Environment, _second?: Environment | undefined) {
        let first = _kind
        let second = _second;
        if (_second && _kind.name < _second.name) {
            first = _second;
            second = _kind;
        }
        this.kind = first;
        this.second = second;
    }
    GetEnvironments () : Environment[] {
        const arr = new Array();
        arr.push(this.kind);
        if (this.second) arr.push(this.second);
        return arr;
    }
    Name() : string {
        const stringify = this.kind.GetAcr();
        return this.isSingle() ? stringify : stringify +"-"+ this.second?.GetAcr();
    }
    isSingle() : boolean {
        return this.second === undefined;
    }
    GetCost() {
        const numberOfVariable = this.second ? 2 : 1;
        const secondCost : number = this.second ? this.second.cost :  0;
        return (this.kind.cost + secondCost) / numberOfVariable;
    }
    equals( other : Object) : boolean {
        if (typeof this  === typeof  other ) {
            const o = other as ObstacleCostCalculator;
            return this.Name() == o.Name()
        } 
        return false;
    }
}

class ObstacleCounter {
    oc : ObstacleCostCalculator;
    private count : number;
    constructor( occ : ObstacleCostCalculator) {
        this.oc = occ;    
        this.count = 0;
    }
    put() : void {
        this.count++;
    }
    peek() : number {
        return this.count;
    }
    isEven() : boolean {
        return this.count % 2 === 0;
    }
    GetCost() {
        return this.oc.GetCost() * this.count;
    }
    equals( other : Object) : boolean {
        if (typeof this  === typeof  other ) {
            const o = other as ObstacleCounter;
            return this.oc.equals(o.oc) && this.count === o.count;
        } 
        return false;
    }
    toString() : string {
        const stringName = new Array(this.count);
        stringName.fill(this.oc.Name());
        return stringName.reduce((pr, cur) => pr ? pr +','+cur : cur);
    }
}

function GetAllPermutationOfEnvironment() : ObstacleCostCalculator[] {
    const allPermutation = Environments.map( e1 => 
        Environments.map(e2 => new ObstacleCostCalculator(e1, e2))
    ).reduce( (a1, a2) => a1.concat(a2));
    
    const allPlusSingle = allPermutation.concat(Environments.map(e => new ObstacleCostCalculator(e)));
    return GetUnique<ObstacleCostCalculator>(allPlusSingle, elem => elem.Name());
}

//Keep trace of the occurece for a kind of obstacle
//For each obstacle it knows how many there are.
//It is build by a set of obstacle that start with 0 occurrence.
class AssignedObstacleCounter {
    env : {[kinds : string] : ObstacleCounter};
    private total : number;
    constructor (counters : ObstacleCostCalculator[]) {
        this.env = {};
        this.total = 0;
        const that = this;
        const counterdKind = GetUnique(counters, (elem) => elem.Name());
        counterdKind.forEach(elem => that.env[elem.Name()] = new ObstacleCounter(elem));
    }
    private GetObstacleCounter(envName : string) : ObstacleCounter {
        const found = Object.entries(this.env)
            .find(a => a[0] === envName);
        if (found) return found[1];
        throw new Error(envName + " not found in the object with obstacle");
    }
    GetCounter(envName :string ) : number {
        return this.GetObstacleCounter(envName)?.peek();
    }
    PutCounter(envName : string | undefined) : boolean {
        if (!envName) return false;
        this.GetObstacleCounter(envName).put();
        this.total++;
        return true;
    }
    GetTotal() {
        return this.total;
    }
}

export interface PlaceCardObstacleWrapper {
    resources : PotentialPlaceCard,
    obstacles : ObstacleCounter[],
    ostablecsSum? : number,
    speedCost? : CostProps
}


function GetAllEnvironmentsWithLessCost(costMultiplier : number, allPermutation : ObstacleCostCalculator[] ,maxCost : number) : ObstacleCostCalculator[] {
    return  allPermutation
        .filter( obstacleCost => obstacleCost.GetCost() * costMultiplier <= maxCost)
        ;
}


function AssignObstacleToCard(counters : AssignedObstacleCounter, card : PotentialPlaceCard, AllPermutationOfEnvironment : ObstacleCostCalculator[]) : PlaceCardObstacleWrapper {
    const obstacles : ObstacleCostCalculator[] =  [];
    let majorCost = card.GetMaxGain();
    //The general principle you will get the obstacle close to the major cost possible
    let nomoreObsFind = true;
    let obstacleCostMultiplier = 1;
    while (majorCost > 0 && nomoreObsFind ) {
        let filteredSingleCost = GetAllEnvironmentsWithLessCost(obstacleCostMultiplier, AllPermutationOfEnvironment, majorCost);        
        nomoreObsFind = filteredSingleCost.length !== 0;
        if (nomoreObsFind) {
            let sortedByNumerosityAndCost = filteredSingleCost.sort((a,b) => GetWeightedCost(b, counters) - GetWeightedCost(a, counters));
            let newObs = sortedByNumerosityAndCost[0];
            obstacles.push(newObs);
            
            newObs.GetEnvironments()
                .forEach(e => counters.PutCounter(e?.GetAcr()));
            majorCost -= newObs.GetCost();
        }
        obstacleCostMultiplier*=2;
    }
    
    const empty = new AssignedObstacleCounter(obstacles);
    obstacles.forEach(occ => empty.PutCounter(occ.Name()));

    return {resources: card, obstacles: Object.values(empty.env)};
}

export default function AssignObstacle(cards : PotentialPlaceCard[]) : PlaceCardObstacleWrapper[] {
    const AllPermutationOfEnvironment = GetAllPermutationOfEnvironment();
    const counters = new AssignedObstacleCounter(Environments.map(elem => new ObstacleCostCalculator(elem)));
    const withObstacle = cards.map((c, index) => AssignObstacleToCard(counters, c, AllPermutationOfEnvironment));
    const withSpeedCost = withObstacle.map(AssignSpeedCost);
    return withSpeedCost;
}

function GetModifier (a:string | undefined , counters: AssignedObstacleCounter) {
    if (!a) throw new Error("Name of the environment must be defined");
    let modifier = 1;
    const counter = counters.GetCounter(a);
    if (counter > 0) {
        modifier *=  1.0 / counter;
    }
    return modifier;
}

function GetWeightedCost ( a:ObstacleCostCalculator , counters: AssignedObstacleCounter) : number {
    let modifier = 1;
    if (!a.isSingle()) {
        modifier *= 0.9;
        modifier *= GetModifier(a.second?.GetAcr(), counters);
    } 
    modifier *= GetModifier(a.kind.GetAcr(), counters);
    return a.GetCost()*modifier;
}


function AssignSpeedCost(value: PlaceCardObstacleWrapper, index: number): PlaceCardObstacleWrapper {
    const lc : CostProps = {gold : 0, speed: 1};
    
    value.ostablecsSum = value.obstacles.length === 0 ? 0  :  value.obstacles.map(a=> a.GetCost()) .reduce((a,b) => a ? a+b : b)
    const costDiff = value.resources.GetMaxGain() - value.ostablecsSum;
    const percentageOfRemainedCost = costDiff / value.resources.GetMaxGain() * 80;
    let speed = Math.floor(percentageOfRemainedCost / 10);
    speed = speed <= 0 ? 1 : speed;
    const gold = value.resources.directIncome > 4.0 && speed > 1 ? Math.floor(value.resources.directIncome - costDiff) : 0;
    value.speedCost = { gold: gold > 0 ? gold : 0 , speed : speed}
    return value;
}

