import ResourceMarket from "./ResourceMarket/ResourceMarket";


export default function page () {
    return (
        <ResourceMarket  resourceIncomes={[ {kind: 'A', resource: "water"}, {kind: 'C', resource: "silk"} ]} />
    );
}