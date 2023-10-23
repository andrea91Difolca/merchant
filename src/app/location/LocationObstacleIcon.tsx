import Image from 'next/image'
import { EnvironmentIcon } from '../common/CommonIcon';


export interface LocationObstacle {
    environment: string;
}

export default function LocationObstacleIcon ({environment} : LocationObstacle) {
    const heightIcon = 25;
    return (
        <EnvironmentIcon  name={environment}  size={heightIcon} />
    )
}