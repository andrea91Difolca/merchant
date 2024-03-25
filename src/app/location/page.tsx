import { GetHexCardFromCalculatedCard } from "@/util/PropsBuilder";
import { PotentialPlaceCard } from "../Wheel/PotentialPlaceCard";
import ResourceMarket from "./ResourceMarket/ResourceMarket";
import { LocationHex, LocationHexProps } from './location';
import AssignObstacle from "../PotentialObstacle/ObstacleGenerator";


export default function page () {
    const potentialCardSample = new PotentialPlaceCard(  ["food","stone","spice"],  ["A","B","C"]);
    const obstacle = AssignObstacle([potentialCardSample]);
    const hexCard = GetHexCardFromCalculatedCard('producer',obstacle[0]);
    return (
        <>
            {LocationHex(hexCard)}
        </>
    );
}