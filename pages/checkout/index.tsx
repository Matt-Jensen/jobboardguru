import Head from 'next/head';
import Layout from '../../components/Layout';
import CheckoutForm from '../../components/CheckoutForm';
import useContact from '../../common/hooks/useContact';

type Props = {}

const CheckoutPage = ({}: Props) => {
  const { contactEmail } = useContact();

  return (
    <>
      <Layout>
        <Head>
          <title>Stripe Checkout | JobBoardGuru</title>
          <link rel="icon" href="https://media.swipepages.com/608449b0f1f515001071f1ba%2Ffavicon%2Fstripe-favicon.ico" />
        </Head>

        <CheckoutForm email={contactEmail} />
      </Layout>
    </>
  )
}

export default CheckoutPage

export const getStaticProps = async () => {
  return {
    props: {},
  }
}
