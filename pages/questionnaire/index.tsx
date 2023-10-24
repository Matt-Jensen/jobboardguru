import Head from 'next/head';
import Layout from '../../components/Layout';
import Questionnaire from '../../features/Questionnaire';

type Props = {}

const QuestionnairePage = ({}: Props) => {
  return (
    <>
      <Layout>
        <Head>
          <title>JobBoardGuru - Company Questions</title>
        </Head>
        <Questionnaire />
      </Layout>
    </>
  )
}

export default QuestionnairePage

export const getStaticProps = async () => {
  return {
    props: {},
  }
}
