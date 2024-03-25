import { GetHexCardFromCalculatedCard } from "@/util/PropsBuilder";
import { LocationHex } from './location';
import { GetPotentialObstacleWrapper } from "../PotentialObstacle/page";
import { ListOfProducers } from "../PotentialObstacle/LocationConstants";
import Places from "./Places/Places"


export default function page () {
    const pObstWrapper = GetPotentialObstacleWrapper(ListOfProducers);
    const hexCardInput = pObstWrapper.map(v => GetHexCardFromCalculatedCard("producer",v))
    return (
        <div >
            <Places kind="producer" ></Places>
            <Places kind="market" ></Places>
            <Places kind="obstacle" ></Places>
        </div>
    );
}