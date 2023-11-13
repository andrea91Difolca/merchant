import { SpecificWheel } from "./WheelPrice";
import {CreateEnvironment, Environment } from "../common/Environment";

class ObstacleCost {
    readonly kind : Environment;
    readonly quantity : number;
    constructor(_name:string)
    constructor(_name: string, _quantity? : number) {
        const count = _quantity ?? 1;
        this.quantity = count;
        this.kind = CreateEnvironment(_name);
    }
    GetCost() {
        return this.kind.cost * this.quantity;
    }
}


interface Obstacle {
    selectedWheel : SpecificWheel[],
    selectedObstacle : ObstacleCost
}