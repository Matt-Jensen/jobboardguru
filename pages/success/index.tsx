import Head from 'next/head';
import Script from 'next/script';
import Layout from '../../components/Layout';
import SuccessHero from '../../components/SuccessHero';

type Props = {}

const SuccessPage = ({}: Props) => {


  return (
    <>
        <Head>
          <title>JobBoardGuru | Checkout Successful</title>
          {/* Meta Pixel Code */}
<Script
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '638929181727023');
fbq('track', 'PageView');
fbq('track', 'AddPaymentInfo');`,
            }} />
<noscript><img height="1" width="1" style={{ display: 'none' }}
src="https://www.facebook.com/tr?id=638929181727023&ev=PageView&noscript=1"
/></noscript>
{/* End Meta Pixel Code */}
        </Head>
      <Layout>
        <SuccessHero />
      </Layout>
    </>
  )
}

export default SuccessPage;

export const getStaticProps = async () => {
  return {
    props: {},
  }
}
