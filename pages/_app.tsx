import { AppProps } from 'next/app';
import { useEffect } from 'react';
import TagManager from 'react-gtm-module';
import '../styles/app.scss';

const GTM_ID = process.env.NEXT_PUBLIC_GMT_ID;
const isProduction = process.env.NODE_ENV === 'production';

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (isProduction && GTM_ID) {
      TagManager.initialize({ gtmId: GTM_ID });
    }
  }, []);

  return <Component {...pageProps} />
}
