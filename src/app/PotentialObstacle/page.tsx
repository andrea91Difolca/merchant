import { PotentialPlaceCard } from "../Wheel/PotentialPlaceCard";
import LocationConstants, { ListOfProducers, ListOfObstacles, ListOfCities } from "./LocationConstants";
import AssignObstacle, { PlaceCardObstacleWrapper, TestObstacle } from "./ObstacleGenerator";
import { SpecificWheelsToString } from "../Wheel/WheelPrice";
import { ArrayToString } from "../../util/StringUtils";

function GetObstacles() : LocationConstants {
    return ListOfProducers;
}

interface SingleObstacleCardRowInput {
    rowNum : number,
    wrapper : PlaceCardObstacleWrapper,
    allKind : string[]
}

function SingleObstacleCardRow({rowNum, wrapper , allKind } : SingleObstacleCardRowInput) {
    const resources = wrapper.resources;

    const specificWheels = resources.resourceIncomes
        .map(elem => elem.wheel);
    const resourcesToString = SpecificWheelsToString(specificWheels, allKind);
    const tdResources = resourcesToString.map((elem,index) => <td style={{border: "1px solid"}} key={rowNum*index*7}>{elem}</td>)
    
    const obstaclesToString  = ArrayToString( wrapper.obstacles.map<string>(a => a.toString()), ";");
    const obstacolCostsToString = ArrayToString(wrapper.obstacles.map<string>(a => a.GetCost().toString()), ";");
    const obstacolSum =wrapper.obstacles.length === 0 ? 0  :  wrapper.obstacles.map(a=> a.GetCost()) .reduce((a,b) => a ? a+b : b)

    return (
        <tr>
            <td>{rowNum}</td>
            {tdResources}
            <td>{resources.income.toFixed(2)}</td>
            <td>{resources.directIncome.toFixed(2)}</td>
            <td>{resources.potentialIncome.toFixed(2)}</td>
            <td>{resources.GetMaxGain().toFixed(2)}</td>
            <td>{(resources.GetMaxGain()-obstacolSum).toFixed(2)}</td>
            <td>{obstaclesToString}</td>
            <td>{wrapper.speedCost?.speed}s/{wrapper.speedCost?.gold}g</td>
            <td>{obstacolCostsToString}</td>
        </tr>
    )
}

function SortByPotentialGainDesc (a: PotentialPlaceCard, b :PotentialPlaceCard) {
    return b.GetMaxGain() - a.GetMaxGain();
}

function GetObstacleList(obstWrapper : LocationConstants) {
    const allKind = obstWrapper.kind;
    const headerKind = allKind.map((elem, index) => <th key={index}>{elem}</th>);
    const placeCard = obstWrapper.list.map(elem => new PotentialPlaceCard(elem, allKind));
    placeCard.sort(SortByPotentialGainDesc);
    const obstaclePLaceCard :PlaceCardObstacleWrapper[] = AssignObstacle(placeCard);
    const placedCard = obstaclePLaceCard.map((elem, index) => 
        <SingleObstacleCardRow key={index*3} wrapper={elem}  rowNum={index} allKind={allKind}  /> )
    return  {header : headerKind, obs : placedCard };
}

function ObstacleGeneratedTable( {idName,items} : {idName:string, items: LocationConstants}) {
    const producerTry = GetObstacleList(items);
    return (
    <>
    <div>Risultati {idName}:  {producerTry.obs.length} </div>
    <table>
        <thead>
            <tr>
                <th>Index</th>
                {producerTry.header}
                <th>Income</th>
                <th>direct</th>
                <th>potential</th>
                <th>PG</th>
                <th>Diff</th>
                <th>OC</th>
                <th>s/g</th>
                <th>Obs</th>
            </tr>
        </thead>
        <tbody>
            {producerTry.obs}
        </tbody>
    </table>
    </>
    )
}


export default function GetPage() {
    return (
        <div>
            <ObstacleGeneratedTable idName="Producer" items={ListOfProducers} />
            <ObstacleGeneratedTable idName="Obstacle" items={ListOfObstacles} />
            <ObstacleGeneratedTable idName="City" items={ListOfCities} />
        </div>
    );
}