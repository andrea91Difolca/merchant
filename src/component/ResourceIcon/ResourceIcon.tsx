import Image from 'next/image';
import CreateResource from '../../model/ResourceArchetype';
import { EnvironmentIconInput } from '../CommonIcon/CommonIcon';
import styles from './resource.module.css'


export function ResourceIcon({ name = "water", size = 20 }: EnvironmentIconInput) {
    const resourceArchetype = CreateResource(name);
    const resourceClassName = styles.resourceIcon + ' ' + styles[name];
    return (
        <Image
            className={resourceClassName}
            src="/block-generic.svg"
            alt={resourceArchetype.name}
            width={size}
            height={size} />
    );
}
