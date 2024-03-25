import { EnvironmentIcon } from "@/component/CommonIcon/CommonIcon";
import styles from './location.module.css';
import Cost, { CostProps } from "@/component/Cost/Cost";
import ResourceMarket from "./ResourceMarket/ResourceMarket";
import { SpecificWheel } from "../Wheel/WheelPrice";

const kindType = ['producer', 'obstacle' , 'market'];
export type CardKind = typeof kindType[number];

export function CheckForTheType(k : string) : CardKind {
    const found = kindType.find(value => value===k);
    if (found) {
        return found;
    }
    throw new Error(k + " is not a CardKind");
}

export interface LocationHexProps {
    specificWheels : SpecificWheel[],
    kind : CardKind,
    obstacles : string[]
    cost : CostProps
}

export function LocationHex( {obstacles,specificWheels, cost, kind} : LocationHexProps) {
    
    const iconSize =25;

    const genericContentCss = "rounded-full bg-slate-400";

    const obstacleIcons = obstacles.map( (obs,idx) => (
        <EnvironmentIcon key={idx} name={obs} size={iconSize} />
    ));
    
    return (
    <div className={styles.hexagon + ' '+ styles[kind]}>
        <div className={styles.cardBody +" h-full my-auto flex flex-col justify-around"} >
            <div className={genericContentCss +  " p-2 flex  justify-center" } >
                    {obstacleIcons}                 
            </div>
            <div className= {genericContentCss +" py-3 pe-2"} >
                <ResourceMarket resourceIncomes={specificWheels} />
            </div>
            <div className={genericContentCss +" p-2 flex  justify-center"}>
                {Cost(cost)}
            </div>
        </div>
    </div>
    )
}