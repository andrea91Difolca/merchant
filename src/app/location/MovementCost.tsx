

export interface LocationCost {
    speed: number;
    gold:  number | undefined;
}

export default function MovementCost({speed,gold=0}: LocationCost)  {

    var compositePart = gold > 0 ? 
        <>
            <span> /</span>
            <span className="gold-cost"> {gold}</span>
        </>
     : <></>

    return (
        <span className='location-speed ' >
            <span className="speed-cost">{speed}</span>
            {compositePart}
        </span>
    )
}