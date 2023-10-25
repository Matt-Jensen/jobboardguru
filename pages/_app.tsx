import { AppProps } from 'next/app';
import Script from 'next/script';
import { useEffect } from 'react';
import '../styles/app.scss';

const GTM_ID = process.env.NEXT_PUBLIC_GMT_ID;
const GOOGLE_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID;
const isProduction = process.env.NODE_ENV === 'production';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (<>
    <Component {...pageProps} />
      {GTM_ID && isProduction && (
        <>
          <Script
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
            }}
          />
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
            }}
          />
        </>
      )}

      {GOOGLE_MEASUREMENT_ID && (
        <Script
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];window.gtag = window.gtag || function gtag(){dataLayer.push(arguments);};gtag('js', new Date());gtag('config', '${GOOGLE_MEASUREMENT_ID}');`,
          }}
        />
      )}
    </>
  );
}
