const range = 20;

interface IObstacleSvg {
    colors : string[]
}

export default function ObstacleSvg({colors} : IObstacleSvg) {
    const shape = colors.length === 1 ?
    (<circle r="10" cx="10" cy="10" fill={colors[0]}  />) :
    (
        <>
            <circle r="5" cx="10" cy="10" fill="transparent" stroke={colors[0]} strokeWidth="10" 
            strokeDasharray="calc(500 * 31.4 / 1000) 31.4" transform="rotate(-45) translate(-10 4.14)"/>
            <circle r="5" cx="10" cy="10" fill="transparent" stroke={colors[1]} strokeWidth="10" 
            strokeDasharray="calc(500 * 31.4 / 1000) 31.4" transform="rotate(135) translate( -10 -24.14)"/>
            <path d="
                M 0, 20 
                L 20, 0 z"  strokeWidth= "1" stroke="black" />
        </>
    );


    return (
        
    <svg height={range} 
        width={range} 
        data-name="obstacle shape" id="obstable-shape" xmlns="http://www.w3.org/2000/svg"  xmlnsXlink="http://www.w3.org/1999/xlink" >
        {shape}
    </svg>
    );
}