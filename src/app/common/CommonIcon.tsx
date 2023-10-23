import Image from 'next/image'
import { CreateEnvironment } from './Environment';
import CreateResource from './ResourceArchetype';
import { NextRequest } from 'next/server';


interface EnvironmentIconInput {
    name:string;
    size:number;
}

export function EnvironmentIcon ({name="sun", size=25} : EnvironmentIconInput) {
    const widthIcon = size;
    const heightIcon = size;
    let formattedSvgLink;  //= CreateEnvironment(name);
    

    return (
        <Image
            src={formattedSvgLink.svgPath}
            alt={"It is an obstacle"}
            className="dark:invert"
            width={widthIcon}
            height={heightIcon}
            priority
        />
    )
}

export function ResourceIcon({name="water", size=20}: EnvironmentIconInput) {
    var resourceArchetype = CreateResource(name);
    var widthIcon = size;
    var heightIcon = size;
    return (
        <Image 
            className={resourceArchetype.className}
            src="/block-generic.svg"
            alt="aaa"
            width={widthIcon}
            height={heightIcon}
        />
    )
}