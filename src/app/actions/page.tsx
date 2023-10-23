import type { ChangeEvent } from "react";
import { useState } from "react";

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