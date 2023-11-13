import { NumericLiteral } from "typescript";
import { GetAvg } from "../common/CommonUtilities";
import wheels, { WheelKindDescriptor } from "./WheelDescriptor";


interface AvgForKind {
    [Kind: string] : number
}

export interface SpecificWheel {
    resource: string,
    kind : string
}

class PriceDealer {
    resource : string;
    avgForKind : AvgForKind;
    constructor(iResource : string, wheel : WheelKindDescriptor) {
        this.resource = iResource;
        this.avgForKind = {};
        Object.entries(wheel).forEach(value => {
            this.avgForKind[value[0]] = 
                GetAvg(value[1].wheel);
        });
    }
    private GetIncome(From:string, To:string) {
        return this.avgForKind[From] - this.avgForKind[To];
    }
    GetAvg(kind: string) {
        return this.avgForKind[kind];
    }
    GetIncomeOfC() : number {
        const res  = this.GetIncome("C", "B") + this.GetIncome("C", "A");
        return res;

    }
    GetIncomeOfB() : number {
        return this.GetIncome("B", "A");
    }
    GetAverageIncomeofA() : number {
        return GetAvg([this.GetIncome("B", "A"), this.GetIncome("C", "A")]);
    }
}

interface Resource2Price {
    [resource : string ]  : PriceDealer; 
}

class WheelPrices {
    dealer : Resource2Price;
    constructor () {
        this.dealer = {};
        Object.entries(wheels).forEach(value => {
           this.dealer[value[0]] = 
            new  PriceDealer (value[0],value[1]);
        });
    }
    GetPriceDealer(resource:string) : PriceDealer {
        return this.dealer[resource];
    }
    GetSpecificPrice(wheel:SpecificWheel) : number {
        return this.GetPriceDealer(wheel.resource)
            .GetAvg(wheel.kind);
    }
    GetTradedResouce(From: SpecificWheel, To: SpecificWheel) : number {
        if (From.kind <= To.kind) {
            throw new Error("Trade with negative income.");
        }
        const ToPrice = this.GetSpecificPrice(To);
        const FromPrice = this.GetSpecificPrice(From);
        const res = FromPrice/ToPrice;
        return res;
    }
}

export default new WheelPrices();