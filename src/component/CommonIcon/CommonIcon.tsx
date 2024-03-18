import Image from 'next/image'

export interface EnvironmentIconInput {
    name:string;
    size:number;
}

function GetEnvironmentSvgUrl(name: string) : string {
    const colorsList = !name || name.length == 0 ? ["sun"] : name.split("-");
    let querystring = "colors="+ colorsList[0]
    if (colorsList.length >= 1) {
        querystring = "colors="+ colorsList[0] + "&" + "colors=" + colorsList[1];
    }
    return "/api/obstacles/svg?"+querystring;
}

export function EnvironmentIcon ({name="sun", size=25} : EnvironmentIconInput) {
    const widthIcon = size;
    const heightIcon = size;
    let formattedSvgLink;  
    //formattedSvgLink= CreateEnvironment(name).svgPath;
    
    formattedSvgLink = GetEnvironmentSvgUrl(name);
    //"/api/obstacles/svg?colors=s&colors=w";

    return (
        <Image
            src={formattedSvgLink}
            alt={"It is an obstacle"}
            className="dark:invert"
            width={widthIcon}
            height={heightIcon}
            priority
        />
    )
}

