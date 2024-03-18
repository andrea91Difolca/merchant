import Image from 'next/image'
import Cost, { CostProps } from '../../component/Cost/Cost';
import ResourceStat, { ResourceStatParam } from './resourceStat';
import { EnvironmentIcon } from '../../component/CommonIcon/CommonIcon';


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
    cost: CostProps;
    icons: string[];
    bkgImg : string;
    resourceStat: ResourceStatParam[];
    maxBlock : number;
    neighbour: Neighbour;
}

export default function LocationCard({loc}: PlaceContainer)  {

    const obstacleIcons = loc.icons.map((element, index)  => {
        const locationObstacle = {environment: element};
        return <EnvironmentIcon key={index} name={locationObstacle.environment} size={25} />;
    });

    const resources = loc.resourceStat.map((element, index)  => {
        return <ResourceStat key={index} name={element.name} 
        wPos={element.wPos} wType={element.wType}  
        blockSize={element.blockSize} />;
    });
    const formattedBkgImage = "url(/location/bkg-img/" + loc.bkgImg + ".jpg)"

    const FooterSize = 40;

    return (

        <div className='hexagon ' style={{ backgroundImage:  formattedBkgImage}}>
 
        <div className={'location-header ' + loc.lType}>
                
            <span className="title">{loc.title}</span>
            <span className='location-header-obstacle'>
                {obstacleIcons} 
            </span>
            <Cost gold={loc.cost.gold} speed={loc.cost.speed} ></Cost>
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