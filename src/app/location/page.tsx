'use client'

import './location.css'
import '../common.css'
import  { Place } from './LocationCard';
import type { ChangeEvent } from "react";
import { useState } from "react";
import PlacesContainer, { Places } from './Places';


export default function LocationList () {
    
    
    const [locations, setLocation] = useState<Places>();
  
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
        <PlacesContainer locations={locations?.locations} />
      </div>
    );
}