import WheelPrice, { SpecificWheel } from "./WheelPrice";
import {GetSum, GetMax} from "../common/CommonUtilities";

function ReduceBp(pSw:SpecificWheel,sw:SpecificWheel, index:number, tArray:SpecificWheel[]) {
    const previosBp = pSw ? 
        WheelPrice.GetSpecificPrice(pSw) : 0;
    return previosBp + WheelPrice.GetSpecificPrice(sw);
}

class SpecificWheelIncome {
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
    constructor(permutation: string[], resourceKind: string[]) {
        if (permutation.length != resourceKind.length) {
            throw new Error("Permutation and assignable kind should be the same in number");
        }
        const aResources : string[] = [];
        const bResources : string[] = [];
        const cResources : string[] = [];
        let resourceToFill : string[] = [];
        for (let index = 0; index < permutation.length; index++) {
            switch(resourceKind[index]) {
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
            const resource = permutation[index];
            if (resource != "") 
                resourceToFill.push(resource);
        }
        
        const CandBIncomes = this.GetResourceCAndBIncomes(bResources, cResources);
        this.directIncome =  CandBIncomes && CandBIncomes.length > 0 ? GetSum(CandBIncomes.map(elem => elem.income)) : 0;
        const AIncomes = this.GetAIncomes(aResources, CandBIncomes, this.directIncome);
        this.potentialIncome = AIncomes && AIncomes.length > 0 ?  GetMax(AIncomes.map(elem => elem.income)) : 0;
        this.income = GetMax([this.potentialIncome, this.directIncome]);
        this.resourceIncomes = new Array< SpecificWheelIncome>().concat(CandBIncomes).concat(AIncomes);
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
            console.log("A resource vuoto")
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
}