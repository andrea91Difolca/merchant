import Image from 'next/image'
import LocationObstacleIcon, {LocationObstacle}  from './LocationObstacleIcon';
import MovementCost, { LocationCost } from './MovementCost';
import ResourceStat, { ResourceStatParam } from './resourceStat';


export interface PlaceContainer {
    loc : Place
}

interface Neighbour {
    obstacle: number;
    producer: number;
    market: number;
}

export interface Place {
    title: string;
    lType: string;
    cost: LocationCost;
    icons: string[];
    bkgImg : string;
    resourceStat: ResourceStatParam[];
    maxBlock : number;
    neighbour: Neighbour;
}

export default function LocationCard({loc}: PlaceContainer)  {

    const obstacleIcons = loc.icons.map((element, index)  => {
        const locationObstacle = {environment: element};
        return <LocationObstacleIcon key={index} environment={locationObstacle.environment}></LocationObstacleIcon>;
    });

    const resources = loc.resourceStat.map((element, index)  => {
        return <ResourceStat key={index} name={element.name} 
        wPos={element.wPos} wType={element.wType}  
        blockSize={element.blockSize} />;
    });
    const formattedBkgImage = "url(/location/bkg-img/" + loc.bkgImg + ".jpg)"

    const FooterSize = 40;

    return (
        <div className='location-card' style={{ backgroundImage:  formattedBkgImage}}>
 
        <div className={'location-header ' + loc.lType}>
                
            <span className="title">{loc.title}</span>
            <span className='location-header-obstacle'>
                {obstacleIcons} 
            </span>
            <MovementCost gold={loc.cost.gold} speed={loc.cost.speed} ></MovementCost>
        </div>
        <div className="body-background"  >
            <div className="resources" >
                {resources}
            </div>
        </div>
        <div className="location-footer row">
            <span>{loc.maxBlock}</span>
            <Image                 
                src="/blocks.svg"
                alt="aaa"
                width={FooterSize}
                height={FooterSize}
                priority
            />
            <span>{loc.neighbour.obstacle}</span>
            <Image                 
                src="/location/obstacle.svg"
                alt="no man land"
                width={FooterSize}
                height={FooterSize}
                priority
            />
            <span>{loc.neighbour.producer}</span>
            <Image                 
                src="/location/dealer.svg"
                alt="resources producer"
                width={FooterSize}
                height={FooterSize}
                priority
            />
            <span>{loc.neighbour.market}</span>
            <Image                 
                src="/location/trader.svg"
                alt="city or big market"
                width={FooterSize}
                height={FooterSize}
                priority
            />
        </div>
    </div>
    )
}