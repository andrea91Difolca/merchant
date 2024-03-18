import styles from './cost.module.css';

export interface CostProps {
    speed?: number | undefined | null;
    gold?:  number | undefined | null;
}

function GetFlavouredSpan({costType, quantity} : {costType:string, quantity: number | null | undefined}) {
    const classNameValue = costType === 'gold' ? styles.gold : styles.speed;

    switch (costType) {
        case 'gold' : 
            return (
                <span className={styles.gold}> {quantity}</span>
            );
        case 'speed' : 
            return (
                <span className={styles.speed}> {quantity}</span>
            );
        default :
        return (<span> /</span>)
    }
}

export default function Cost({speed,gold}: CostProps)  {
    if (speed == null && gold == null) {
        throw Error("Cost with no speed nor gold");
    }

    const speedGoldArrays = [
        {costType: 'speed',quantity: speed},
        {costType:'gold',quantity: gold}
    ].filter(obj => obj.quantity !== undefined);
    
    const refinedCost = speedGoldArrays.map((elem,index) => {
        if(index === 0) {
            return [elem]
        }else return [{costType:'filler',quantity: 1}, elem]
    }).flat();
    const reactElements = refinedCost.map(GetFlavouredSpan);
    
   return (
   <span className='cost'>
        {reactElements}
   </span>
   )
}