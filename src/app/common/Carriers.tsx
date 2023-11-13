import Image from 'next/image'
import CarrierGridFactory from '../api/carrierShape/[kind]/CarrierGridFactory';
import { CarrierSizeCalculator } from '../api/carrierShape/Carrier';


interface CarrieIconInput {
    name: string,
    size?:number | undefined,
}

export default function CarrierIcon({name, size} : CarrieIconInput) {
    const carrier = CarrierGridFactory(name);
    
    const url = "/api/carrierShape/" +name;

    const sizes = new CarrierSizeCalculator(carrier, size);
    
    return (
        <Image src={url}
            alt='carrier icon'
            height={sizes.height}
            width={sizes.width}
            priority
         />
    );
}