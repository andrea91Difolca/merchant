import { GetColors } from '@/util/Environment';
import { type NextRequest } from 'next/server'
import ObstacleSvg from './Obstacles';
 
export async function GET(request: NextRequest) {
    const ReactDOMServerPromise = import('react-dom/server');
    const searchParams = request.nextUrl.searchParams;
    const colors = searchParams.getAll("colors");

    const codifiedColors = GetColors(colors);
    const component = <ObstacleSvg  colors={codifiedColors} />

    const ReactDOMServer = (await ReactDOMServerPromise).default
    const svg = Buffer.from(ReactDOMServer.renderToString(component))
    
    return new Response(svg, {
        headers: [["Content-type", "image/svg+xml"]],
        status: 200,
        statusText: "success"
    });    
}