import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout/layout';
import utilStyles from '../styles/utils.module.css';

import Matches from '../components/Matches';

import { useQuery } from '@apollo/react-hooks';
import MATCHES_QUERY from '../graphql/matches.query';

import MOCK_DATA from '../mock/matches.json';

export default function Home() {
  const matches = MOCK_DATA;

  // const classes = useStyles();
  // Create a query hook
  // const { data, loading, error } = useQuery(MATCHES_QUERY);

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  // if (error) {
  //   return <p>Error: {JSON.stringify(error)}</p>;
  // }

  return (
    <Layout home>
      <Head>
        <title>{siteTitle} - title index</title>
      </Head>

      <Matches matches={matches} />
    </Layout>
  );
}
