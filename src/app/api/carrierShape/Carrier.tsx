const step= 100;

export interface CarrierGridPosition {
    x : number,
    y : number
}

export interface CarrierGrid {
    xaxis : number,
    yaxis : number,
    emptyPositions :  CarrierGridPosition[],
    margin: number
}

export class CarrierSizeCalculator {
    naturalHeight :number;
    naturalWidth : number;
    height :number;
    width : number;
    constructor(kind : CarrierGrid, normalizedHeight: number= 1) {
        const normalizedMargin = (kind.margin ?? 10)
        this.naturalHeight = kind.yaxis*step + normalizedMargin;
        this.naturalWidth = kind.xaxis*step + normalizedMargin;
        
        this.height = normalizedHeight;
        this.width = this.naturalWidth*normalizedHeight/this.naturalHeight
    }
}

function SquareSvg({x, y}: CarrierGridPosition) {
    return (
        <rect x={x} y={y} width={step} height={step} />
    );
}

function CreatePositionGrid(xBlock:number, yBlock:number) : CarrierGridPosition[][] {
    const rows : CarrierGridPosition[][]  = [];
    for(var y = 0; y < yBlock; y++) {
        rows.push([]);
        for(var x = 0; x < xBlock; x++) {
            const actualx = step*x;
            const actualy = step*y;
            rows[y].push({x: actualx, y: actualy})
        }
    }
    return rows;
}

function FilterByPositionAndFlat(grid : CarrierGridPosition[][], emptyPosition: CarrierGridPosition[]) {
    const rows : CarrierGridPosition[]  = [];
    for(var ay = 0; ay < grid.length; ay++) {
        for(var ax = 0; ax < grid[ay].length; ax++) {
            const found = emptyPosition.find( (elem) => { 
                return  elem.x===ax &&  elem.y===ay;
                });
            if (!found) rows.push(grid[ay][ax])
        }
    }
    return rows;
}

export default function Carrier(input : CarrierGrid) {
    const sizes = new CarrierSizeCalculator(input);

    const completeGrid = CreatePositionGrid(input.xaxis, input.yaxis);
    const rectsMeta = FilterByPositionAndFlat(completeGrid, input.emptyPositions);
    
    const normalizedMargin = input.margin ?? 10;
    const halfMargin = normalizedMargin /2;
    

    const rectsMargin = rectsMeta.map((elem) => {return  {x: elem.x + halfMargin, y : elem.y + halfMargin}})
    const rects = rectsMargin.map(SquareSvg);
    
    return (
        
    <svg height={sizes.naturalHeight} 
        width={sizes.naturalWidth} 
        data-name="human shape" id="human-shape" xmlns="http://www.w3.org/2000/svg"  xmlnsXlink="http://www.w3.org/1999/xlink" >
        <g style={{strokeWidth:1,stroke:"black", fill:"white"}}>
            {rects}
        </g>
    </svg>
    );
}