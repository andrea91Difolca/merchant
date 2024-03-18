import {PotentialPlaceCard, SpecificWheelIncome} from "./PotentialPlaceCard";
import {GetUnique, GetUniqueIDForPermutation, PermutationFromCombination} from "../../util/ListUtils";
import {RESOURCE_ARCHETYPES} from "../../model/ResourceArchetype";
import { filterObstacle } from "./PotentialPlaceCardFilter";
import { SpecificWheel } from "./WheelPrice";
import { ChangeEvent, useState } from "react";
import { JsxElement } from "typescript";

interface PotentialPlaceCardContainer  {
    card : PotentialPlaceCard,
    allKind : string[],
    rowNum : number
}



function ResourceDefaulted(card : PotentialPlaceCard, kindFilter : string) {
    const cardA = card.resourceIncomes.filter(elem => elem && elem.wheel && elem.wheel.kind === kindFilter);
    if(cardA && cardA.length > 0 ) {
        return cardA.at(0)?.wheel.resource;
    }else {
        console.log(cardA);
        return "-"
    };
}

function SingleIncome({card, allKind, rowNum} : PotentialPlaceCardContainer) {
    let resourceIndex = 0;
    let index = 0;
    const resources : string[] = [];
    while( index < allKind.length) {
        if ( resourceIndex < card.resourceIncomes.length) {
            const kind = allKind[index];
            const cWheel = card.resourceIncomes[resourceIndex].wheel;
            if (kind == cWheel.kind) {
                resources.push(cWheel.resource);
                resourceIndex++;
                index++;
            } else {
                resources.push("-")
                index++
            }
        }
    }
    const tdResources = resources.map((elem,index) => <td style={{border: "1px solid"}} key={index}>{elem}</td>)
    return (
        <tr>
            <td>{rowNum}</td>
            {tdResources}
            <td>{card.income.toFixed(2)}</td>
            <td>{card.directIncome.toFixed(2)}</td>
            <td>{card.potentialIncome.toFixed(2)}</td>
        </tr>
    )
}



export default function ObstaclePrice () {
    const allKind = ["B","C","C","C"];
    let allPermutation = PermutationFromCombination(RESOURCE_ARCHETYPES, allKind.length);
    
    allPermutation = GetUnique<string[]>(allPermutation, perm => GetUniqueIDForPermutation(allKind, perm).toString());

    const headerKind = allKind.map((elem, index) => <th key={index}>{elem}</th>);
    const placeCards = allPermutation.map(elem => new PotentialPlaceCard(elem,  allKind) );
    
    placeCards.sort((a,b) => a.income -b.income);
    /*
    const resource = "silk";
    const FilteredCards = filterObstacle(resource, placeCards);
    */
    
    const producerTry = placeCards.map((elem, index) => 
            <SingleIncome key={index} card={elem} rowNum={index} allKind={allKind} />);
    return (
    <div>
        <div>Risultati:  {producerTry.length} </div>
        <table>
            <thead>
                <tr>
                    <th>Index</th>
                    {headerKind}
                    <th>Income</th>
                    <th>direct</th>
                    <th>potential</th>
                </tr>
            </thead>
            <tbody>
                {producerTry}
            </tbody>
            
        </table>
    </div>
    );
}