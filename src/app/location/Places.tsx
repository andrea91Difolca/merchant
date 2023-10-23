

import { start } from "repl";
import LocationCard, { Place, PlaceContainer } from "./LocationCard";
import { SplitArray } from "../common/CommonUtilities";



export interface Places{
    locations: Place[] | undefined;
}

export default function LocationGrid({locations}: Places)  {

    var locationCards;
    if (!locations) {
        locationCards = <></>;
    } else {
        const splittedValue = 4;
        const splittedLocations =  SplitArray(locations, splittedValue);

        locationCards = splittedLocations.map((elems : Place[], rowIndex: number) =>
        {
            const startNumber = rowIndex * splittedValue;


            const tableRow = elems.map((elem : Place, columnindex: number) => {
                const uniqueKey = startNumber + columnindex;
                const container : PlaceContainer = {loc: elem};
                return (
                <td key={uniqueKey}>
                    <LocationCard  
                        loc={container.loc}
                        />
                </td>)
            });

            return <tr key={startNumber*-1} >{tableRow}</tr>
        });
    }

    return (
        <table className="location-container">
            <tbody>
            {locationCards}
            </tbody>
        </table>
    )
}