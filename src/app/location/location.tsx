import { EnvironmentIcon } from "@/component/CommonIcon/CommonIcon";
import styles from './location.module.css';
import Cost, { CostProps } from "@/component/Cost/Cost";
import ResourceMarket from "./ResourceMarket/ResourceMarket";
import { SpecificWheel } from "../Wheel/WheelPrice";

interface LocationHexProps {
    specificWheels : SpecificWheel[],
    kind : 'producer' | 'obstacle' | 'market',
    obstacles : string[]
    cost : CostProps
}

function LocationHex( {obstacles,specificWheels, cost, kind} : LocationHexProps) {
    
    const iconSize =25;

    const obstacleIcons = obstacles.map( (obs,idx) => (
        <EnvironmentIcon key={idx} name={obs} size={iconSize} />
    ));
    
    return (
    <div className={styles.hexagon}>
 
        <div className={styles.header + ' '+ kind}>
            <span className={styles.he}>
                {obstacleIcons} 
            </span>
            {Cost(cost)}
        </div>
        <div className="body-background"  >
            <div className="resources" >
                <ResourceMarket resourceIncomes={specificWheels} />
            </div>
        </div>
    </div>
    )
}