import React from "react";
import Script from "next/script";

const GoogleTrack = () => {
  if (process.env.NODE_ENV === "production"){ return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-9F7R7RSGX9`}
      />
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
         window.dataLayer = window.dataLayer || [];
         function gtag(){dataLayer.push(arguments);}
         gtag('js', new Date());

         gtag('config', 'G-9F7R7RSGX9');
        `}
      </Script>
    </>
  );  }
  return null;
  
};

export default GoogleTrack;
