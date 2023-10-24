import Head from 'next/head';
import dynamic from "next/dynamic";
import Layout from '../components/Layout';
import Container from '../components/Container';
import Header from '../components/Container/Header';
import Content from '../components/Container/Content';
import Sidebar from '../components/Container/Sidebar';
import LandingHero from '../components/LandingHero';

// Load non-SSR components
const Navigation = dynamic(() => import('../components/Navigation'), {
  ssr: false,
});
const LargeBasket = dynamic(() => import('../components/LargeBasket'), {
  ssr: false,
});
const LandingFeatures = dynamic(() => import('../components/LandingFeatures'), {
  ssr: false,
});

type Props = {}

const Index = ({}: Props) => {
  return (
    <>
      <Layout>
        <Head>
          <title>Job Board Guru</title>
        </Head>
        <Navigation destination="questionnaire" progress={false} />
        <LandingHero />
        <Container>
          <Header>Your partners in finding your next job</Header>
          <Content>
            <LandingFeatures />
          </Content>
          <Sidebar>
            <LargeBasket />
          </Sidebar>
        </Container>
      </Layout>
    </>
  )
}

export default Index

export const getStaticProps = async () => {
  return {
    props: {},
  }
}
