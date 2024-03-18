import "./actions.css";
import CarrierIcon from "../../component/Carrier/Carriers";
import Cost, { CostProps } from "../../component/Cost/Cost";

interface SingleActionProps {
    cost : CostProps 
}

export default function SingleAction(io : SingleActionProps) {
    return (
<div className='single-action'>
    <div>
        {Cost(io.cost)}
    </div>
    <span className="benefit description-font">1 x <CarrierIcon name='human' key={1} size={25} /> </span>
</div>
    )
}