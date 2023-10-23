import Carrier, {CarrierGrid, CarrierGridPosition} from "../Carrier";

interface CarrierFactory {
    Is(kind : string) : boolean,
    Create() : CarrierGrid
}

class Position implements CarrierGridPosition {
    x: number;
    y: number;
    constructor([xpos, ypos] : [number, number]) {
        this.x = xpos;
        this.y = ypos;
    }
}

class CarrierInput implements CarrierGrid {
    emptyPositions: CarrierGridPosition[];
    margin: number = 10;
    xaxis: number;
    yaxis: number;

    constructor(x:number, position : [number, number][])
    constructor(x: number, positions : [number, number][], y : number)
    constructor(x: number, positions : [number, number][]
        ,y?: number
        ,margin?: number
    ) 
    {
        this.emptyPositions = positions.map((coordinate) => new Position(coordinate))
        this.xaxis = x;
        this.yaxis = y || x;
        this.margin = margin ?? 10;
    }
}

abstract class CarrierShape implements CarrierFactory {
    protected Name : string;
    constructor(name:string) {
        if (!name) throw  new Error("Name cannot be null");
        this.Name = name.toLowerCase();
    }
    Is(kind: string): boolean {
        return kind?.toLowerCase() === this.Name;
    }
    abstract Create(): CarrierGrid;
}

class HumanShape extends CarrierShape {
    constructor() {
        super ("human")
    }
    
    Create(): CarrierGrid {
        return new CarrierInput(3, [[0,0], [2,0]]);
    }
}

class CattleShape extends CarrierShape {
    constructor() {
        super ("cattle")
    }
    
    Create(): CarrierGrid {
        return new CarrierInput(4, [[0,0], [3,0]]);
    }
}

class WagonShape extends CarrierShape {
    constructor() {
        super ("wagon")
    }
    Create(): CarrierGrid {
        return new CarrierInput(5, [[0,0], [1,0], [6,0], [7,0]], 8);
    }
}

const CarrierShapes = [
    new HumanShape(),
    new CattleShape(),
    new WagonShape
]

export default function CarrierGridFactory(kind :string) {
    let factory = CarrierShapes.find((elem)=> elem.Is(kind));
    if (!factory) throw new Error("CarrierFactory not found");
    return factory.Create();
}
