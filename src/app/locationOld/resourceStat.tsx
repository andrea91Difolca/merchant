import Image from 'next/image';
import CreateResource, { ResourceArchetype } from '../../model/ResourceArchetype';
import { ResourceIcon } from '@/component/ResourceIcon/ResourceIcon';
import { GetDefaultSizeForWheel } from '../Wheel/ResourceWheel';

export interface ResourceStatParam {
    name: string;
    wType: string;
    wPos: number;
    blockSize: number;
}

export default function ResourceStat(resource : ResourceStatParam)  {
    var resourceArchetype :ResourceArchetype= CreateResource(resource.name);

    const IconSize = 30;
    const positionIcon = IconSize/3 * 2;

    var blockSize = resource.blockSize;

    if (!blockSize) {
        blockSize = 1
        //GetDefaultSizeForWheel(resource.name, resource.wType);
    }

    return (                
    <div className='resource'>
        <div className="row" >
            <span>{resource.wType}</span>
            <ResourceIcon name={resource.name} size={IconSize} />
        </div>
        <div className='row'>
            <span>{blockSize}</span>
            <Image 
                src="/tetris-4-L.svg"
                alt="aaa"
    
                width={IconSize}
                height={IconSize}
                
            />
        </div>
        <div className="row" >
            <span>{resource.wPos}</span>
            <Image
                src="/settoreCosto.svg"
                alt="aaa"
    
                width={positionIcon}
                height={positionIcon}
                priority
            />
        </div>
    </div>);
}