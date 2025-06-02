import Script from "next/script";
import React from "react";
import { getGoogleAnalytics } from "../../utils/googleAnalytics.utils";

const GoogleAnalytics = () => {
  if (process.env.NODE_ENV === "production")
    return (
      <>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-9F7R7RSGX9"
        ></Script>
        <Script>{getGoogleAnalytics()}</Script>
      </>
    );
  return null;
};

export default GoogleAnalytics;
