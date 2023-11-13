import {PotentialPlaceCard} from "./PotentialPlaceCard";

interface PotentialPlaceCardContainer {
    card : PotentialPlaceCard
}


function SingleIncome({card} : PotentialPlaceCardContainer) {
    return (
        <tr>
            <td>{card.resourceIncomes[0].wheel.kind + ","+ card.resourceIncomes[0].wheel.resource + "," + card.resourceIncomes[0].income}</td>
            <td>{card.resourceIncomes[1].wheel.kind + "," +card.resourceIncomes[1].wheel.resource + "," + card.resourceIncomes[1].income}</td>
            <td>{card.resourceIncomes[2].wheel.kind + "," +card.resourceIncomes[2].wheel.resource+ "," + card.resourceIncomes[2].income}</td>
            <td>{card.income}</td>
            <td>{card.directIncome}</td>
            <td>{card.potentialIncome}</td>
        </tr>
    )
}

export default function ObstaclePrice () {
    const test =  new PotentialPlaceCard(["spice", "stone", "food"], ["A","C","B"]);

    return (
        <table>
            <thead>
                <tr>
                    <th>A</th>
                    <th>C</th>
                    <th>B</th>
                    <th>Income</th>
                    <th>direct</th>
                    <th>potential</th>
                </tr>
            </thead>
            <tbody>
                <SingleIncome card={test} />
            </tbody>
            
        </table>
    );
}