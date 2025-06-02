export const getGoogleAnalytics =
  () => `window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-9F7R7RSGX9');`;
