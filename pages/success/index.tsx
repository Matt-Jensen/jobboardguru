import Head from 'next/head';
import Layout from '../../components/Layout';
import SuccessHero from '../../components/SuccessHero';

type Props = {}

const SuccessPage = ({}: Props) => {
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
