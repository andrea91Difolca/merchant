'use client'

import Image from 'next/image'

export default function CarrierPage() {
    return (
<Image  
              src="/api/carrierShape"
              alt="Vercel Logo"
              width={300}
              height={300}
              priority
            />
    );
}