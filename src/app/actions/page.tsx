import '../common.css'
import './actions.css'
import type { ChangeEvent } from "react";
import { useState } from "react";
import Image from 'next/image'
import { EnvironmentIcon } from "../common/CommonIcon";
import CarrierIcon from '../common/Carriers';


/*
export default function ActionDisplay () {

    const [locations, setLocation] = useState<Actions>();
  
    const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      const target = e.target;
      const files = target.files;
      const firstFile = files && files.length > 0 ? files[0] : undefined;

      firstFile?.text()
        .then(  (textContent) => {
            const loc = JSON.parse(textContent);

            setLocation({locations: loc});
    });
  };
    return (
      <div>
        <p>Select File</p>
        <input type="file" onChange={onFileChange} />
        <h1>Locations</h1>
        
      </div>
    );
}
*/


interface ActionCardInput {

}

interface ActionCardContainer {
    a :ActionCardInput
}

export default function ActionCard({a} : ActionCardContainer) {

  const FooterSize = 10;

  return (
<div className="action-card" > 
  <div className="action-upper-card">

    <div className="action-card-body">
      <div className='header'>
        <span className='title'>HELP FOR HIRE</span>  
      </div>
      
      <div className='actions-choice'>

        <div className='single-action'>
          <div>
            <span className="cost">0</span>
          </div>
          <span className="benefit description-font">1 x <CarrierIcon name='human' key={1} size={25} /> </span>
        </div>
        <div className='single-action'>
          <div>
            <span className="cost">2</span>
          </div>
          <span className="benefit description-font">+1 speed</span>
        </div><div className='single-action'>
          <div>
            <span className="cost">2</span>
          </div>
          <span className="benefit description-font">+1 speed</span>
        </div>
        <div className='single-action'>
          <div>
              <span className="cost">3</span>
          </div>
          <span className="benefit description-font">testo molto lungo di prova aaaaaaaaaaaaa questo tizio fa il fico</span>
        </div>

      </div>

    </div>
    
    <div className="carrier speed-action"> 
      <div className="carrier-heightblock">
          <span className='upside-down'>0</span>
      </div>
      <div className="carrier-heightblock">
          <span className='upside-down'>1</span>
      </div>
      <div className="carrier-heightblock">
          <span className='upside-down'>1</span>
      </div>
      <div className="carrier-heightblock">
          <span className='upside-down'>1</span>
      </div>
      <div className="carrier-heightblock">
          <span className='upside-down'>1</span>
      </div>
      
    </div>

  </div>
  
  <div className="carrier footer upside-down">
    <div className='prop'>
      <span className="cost">2</span>
      
      <span className="resistance">
        <EnvironmentIcon 
          name="sun"  
          size={FooterSize}
        />
      </span>
    </div>
    <div >
      <span className='description-font'>Human - discard at the start of "travel phase" if it has wounds.</span>
    </div>

  </div>
  
</div>
  );
}