import { GetHexCardFromCalculatedCard } from "@/util/PropsBuilder";
import { CardKind, LocationHex } from '../location';
import { GetPotentialObstacleWrapper } from "@/app/PotentialObstacle/page";
import { ListOfProducers , ListOfCities ,ListOfObstacles} from "@/app/PotentialObstacle/LocationConstants";

function GetLocationConstant(kind : CardKind) {
    switch(kind) {
        case 'producer' : 
        return ListOfProducers
        case 'market' :
        return ListOfCities
        case 'obstacle' : 
        return ListOfObstacles
        default:
            throw new Error(kind + ' is not one of the right CardKind');
    }
}


export default function Places ( {kind } : {kind : CardKind} ) {
    const hexCardInput = GetPotentialObstacleWrapper(GetLocationConstant(kind))
        .map(v => GetHexCardFromCalculatedCard(kind,v))
    return (
        <div className="columns-3">
            {hexCardInput.map( ( {cost, kind, obstacles, specificWheels},ix) => 
            <div className="py-2">
            <LocationHex key={kind + ix.toString()} cost={cost} kind={kind} obstacles={obstacles} specificWheels={specificWheels} ></LocationHex>
            </div>
            )}
        </div>
    );
}