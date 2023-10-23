import React from "react";
import Carrier, {CarrierGrid, CarrierGridPosition} from "../Carrier";
import { NextRequest } from "next/server";
import CarrierGridFactory from "./CarrierGridFactory";


export async function GET(request: NextRequest, {params} : {params: {kind:string}}) {
    const ReactDOMServerPromise = import('react-dom/server');
    const parsable = request.url?.split("?");
    let carrierInput = CarrierGridFactory(params.kind);
    const component = <Carrier xaxis={carrierInput.xaxis} yaxis={carrierInput.yaxis} margin={carrierInput.margin} emptyPositions={carrierInput.emptyPositions} />
    const ReactDOMServer = (await ReactDOMServerPromise).default
    const svg = Buffer.from(ReactDOMServer.renderToString(component))
    
    return new Response(svg, {
        headers: [["Content-type", "image/svg+xml"]],
        status: 200,
        statusText: "success"
    });    
}