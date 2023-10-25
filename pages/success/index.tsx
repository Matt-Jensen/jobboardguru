import Head from 'next/head';
import { useEffect } from 'react';
import Layout from '../../components/Layout';
import SuccessHero from '../../components/SuccessHero';
import metrics from '../../common/services/metrics';

const isProduction = process.env.NODE_ENV === 'production';

type Props = {}

const SuccessPage = ({}: Props) => {
  useEffect(() => {
    if (isProduction) {
      metrics.sendEvent(
        'conversion', {
          'send_to': 'AW-11388595971/9zA1CPW_i_AYEIPewLYq',
          'transaction_id': ''
      });
    }
  }, []);

  return (
    <>
      <Layout>
        <Head>
          <title>JobBoardGuru | Checkout Successful</title>
        </Head>

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
