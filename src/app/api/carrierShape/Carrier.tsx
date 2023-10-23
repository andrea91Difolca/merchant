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

function SquareSvg({x, y}: CarrierGridPosition) {
    return (
        <rect x={x} y={y} width={step} height={step} />
    );
}

function CreatePositionGrid(widthBlock:number, heightBlock:number) : CarrierGridPosition[][] {
    const rows : CarrierGridPosition[][]  = [];
    for(var y = 0; y < heightBlock; y++) {
        rows.push([]);
        for(var x = 0; x < heightBlock; x++) {
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

export default function Carrier({xaxis: heigth, yaxis: width, emptyPositions, margin=10} : CarrierGrid) {
    const CompleteGrid = CreatePositionGrid(heigth, width);
    const rectsMeta = FilterByPositionAndFlat(CompleteGrid, emptyPositions);
    
    const normalizedMargin = (margin ?? 10)
    const halfMargin = normalizedMargin /2;
    

    const rectsMargin = rectsMeta.map((elem) => {return  {x: elem.x + halfMargin, y : elem.y + halfMargin}})
    const rects = rectsMargin.map(SquareSvg);
    return (
        
    <svg height={heigth*step + normalizedMargin} 
        width={width*step + normalizedMargin} 
        data-name="human shape" id="human-shape" xmlns="http://www.w3.org/2000/svg"  xmlnsXlink="http://www.w3.org/1999/xlink" >
        <g style={{strokeWidth:1,stroke:"black", fill:"white"}}>
            {rects}
        </g>
    </svg>
    );
}