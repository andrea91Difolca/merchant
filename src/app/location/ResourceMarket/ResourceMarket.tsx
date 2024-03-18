import { PotentialPlaceCard, SpecificWheelIncome } from '@/app/Wheel/PotentialPlaceCard';
import styles from './resourcemarket.module.css';
import { ResourceArchetype } from '@/model/ResourceArchetype';
import wheels from '@/model/WheelDescriptor';
import { ResourceIcon } from '@/component/ResourceIcon/ResourceIcon';
import { SpecificWheel } from '@/app/Wheel/WheelPrice';



class ResourceRowProps {
    readonly resource : ResourceArchetype;
    readonly values : number[];
    constructor (kind: string, name: string) {
        this.resource = ResourceArchetype.GetInstance(name);

        const wheelKind = wheels[this.resource.name][kind];
        
        this.values = wheelKind.wheel;
    }
}


function ResourceRow( {kind, resource}: SpecificWheel) {
    const iconSize = 20;
    const props = new ResourceRowProps(kind, resource);
    const numbers = kind == 'C' ? props.values.reverse() : props.values;

    return (
        <>
            <div className='border-e-solid border-e-2'>
                <span className='inline-flex ' >
                    <ResourceIcon name={props.resource.name} size={iconSize} /> 
                </span>
            </div>
            <div className='border-t-2' > {numbers[0]} </div>
            <div className='border-t-2'> {numbers[1]} </div>
            <div className='border-t-2'> {numbers[2]} </div>
        </>
    );
}

function FilterTheWheels({resource}: SpecificWheel) {
    return !(!resource || resource === '');
}


export default function ResourceMarket({resourceIncomes}: {resourceIncomes : SpecificWheel[]})  {
    const values = resourceIncomes.filter(FilterTheWheels)
        .map((w,i) => <ResourceRow key={i} kind={w.kind} resource={w.resource} /> );
    
        return (
            <div className='grid grid-cols-4 text-center align-middle'>
                {values}
            </div>
        )
}