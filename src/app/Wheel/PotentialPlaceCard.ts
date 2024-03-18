import WheelPrice, { SpecificWheel } from "./WheelPrice";
import {GetSum, GetMax, GetAvg} from "../../util/ListUtils";

export class SpecificWheelIncome {
    wheel : SpecificWheel;
    income: number;
    constructor(_wheel : SpecificWheel, _income : number) {
        this.wheel = _wheel;
        this.income = _income;
    }
}

export class PotentialPlaceCard {
    directIncome : number;
    potentialIncome : number;
    income : number;
    resourceIncomes : SpecificWheelIncome[];
    resourcesKind : string[];
    constructor(permutation: string[], resourceKind: string[]) {
        if (permutation.length != resourceKind.length) {
            throw new Error("Permutation and assignable kind should be the same in number");
        }
        this.resourcesKind = resourceKind;
        const aResources : string[] = [];
        const bResources : string[] = [];
        const cResources : string[] = [];
        const resourceIncomes : SpecificWheelIncome[] = [];
        let resourceToFill : string[] = [];
        for (let index = 0; index < permutation.length; index++) {
            
            const kind = resourceKind[index];
            const resource = permutation[index];
            if (resource && resource != "") {

                switch(kind) {
                    case "A" : {
                        resourceToFill = aResources; 
                    } break;
                    case "B" : {
                        resourceToFill = bResources; 
                    } break;
                    case "C" : {
                        resourceToFill = cResources; 
                    } break;
                }
                resourceToFill.push(resource);
            } else {
                //Case in which resource is blank
                resourceIncomes.push(new SpecificWheelIncome({kind: kind, resource: resource },0));
            }
        }
        
        const CandBIncomes = this.GetResourceCAndBIncomes(bResources, cResources);
        this.directIncome =  CandBIncomes && CandBIncomes.length > 0 ? GetAvg(CandBIncomes.map(elem => elem.income)) : 0;
        const AIncomes = this.GetAIncomes(aResources, CandBIncomes, this.directIncome);
        this.potentialIncome = AIncomes && AIncomes.length > 0 ?  GetMax(AIncomes.map(elem => elem.income)) : 0;
        this.income = GetMax([this.potentialIncome, this.directIncome]);
        this.resourceIncomes = resourceIncomes
            .concat(CandBIncomes)
            .concat(AIncomes)
            .sort((a,b) => a.wheel.kind.charCodeAt(0) - b.wheel.kind.charCodeAt(0));
    }

    private ConvertToSpecificWheel(_kind: string, resources : string[]) : SpecificWheel[] {
        return resources.map(elem => {
           return {kind : _kind, resource : elem };
        });
    }
    private GetResourceCAndBIncomes (bResources : string[], cResources: string[]) : SpecificWheelIncome[] {
        
        const bIncomes = this.ConvertToSpecificWheel("B", bResources).map(e =>  
          new SpecificWheelIncome(e,  WheelPrice.GetPriceDealer(e.resource).GetIncomeOfB())    
        )
        const cIncomes = this.ConvertToSpecificWheel("C", cResources).map(e =>  
            new SpecificWheelIncome(e,  WheelPrice.GetPriceDealer(e.resource).GetIncomeOfC())    
        )
        return bIncomes.concat(cIncomes);
    }
    //We want 
    private GetAIncomes(aResources: string[], CandBIncome : SpecificWheelIncome[], directIncome: number) : SpecificWheelIncome[] {
        if (!aResources || aResources.length === 0) {
           return []; 
        }
        return aResources.map(aElem =>  {
            const toElem : SpecificWheel = { kind: "A", resource : aElem}
            const totalNumberOfAFromEachSource = GetSum(
                CandBIncome.map(fromElem => WheelPrice.GetTradedResouce(fromElem.wheel,toElem))
            );
            const value =totalNumberOfAFromEachSource * WheelPrice.GetPriceDealer(aElem).GetAverageIncomeofA() 
            - directIncome;
            return new SpecificWheelIncome(toElem,
                value);
        });
    }
    IsPotentiallyUseful() {
        return this.potentialIncome > this.directIncome ? 1 : -1;
    }
    GetMaxGain() {
        return this.potentialIncome > 0 ? (this.potentialIncome / this.directIncome) : this.directIncome;
    }
}