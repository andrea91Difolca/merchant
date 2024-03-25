import { PlaceCardObstacleWrapper } from "@/app/PotentialObstacle/ObstacleGenerator";
import { CardKind, LocationHexProps } from "@/app/location/location";

/**
 * The card parameter is generated in a massive way which take in consideration a lot of parameter.
 * The card are generate using a way to balance obstacle and effects
 * 
 * @param complexMod output of the generated card parameter
 * 
 * This method should return the essential info to print an hexagonal card
 */
export function GetHexCardFromCalculatedCard(kind : CardKind, complexMod : PlaceCardObstacleWrapper) : LocationHexProps {
    const specificWheels = complexMod.resources.resourceIncomes.map(v => v.wheel);
    const obstacles = complexMod.obstacles.map(o => o.toString().split(',') ).flat(1);
    const cost = complexMod.speedCost;
    if(!cost) throw Error ("cost is not defined for the card");
    if (cost.gold === 0) cost.gold = undefined;

    return {
        cost : cost,
        kind : kind,
        specificWheels : specificWheels,
        obstacles : obstacles
    }
}