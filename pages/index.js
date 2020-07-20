import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';

import moment from 'moment';

import { useQuery } from '@apollo/react-hooks';
import MATCHES_QUERY from '../graphql/matches.query';

export default function Home() {
  // Create a query hook
  const { data, loading, error } = useQuery(MATCHES_QUERY);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {JSON.stringify(error)}</p>;
  }

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <table border="1">
        <tbody>
          {data.matches.map((match) => {
            return (
              <tr key={`match__${match.id}`}>
                <td>{match.number}</td>
                <td>{match.homeTeam}</td>
                <td>{match.homeScore}</td>
                <td>{match.awayScore}</td>
                <td>{match.awayTeam}</td>
                <td>{moment(match.date).utc().format('DD-MM-YYYY')}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <section className={utilStyles.headingMd}>
        <p>
          <Link href="/teams">
            <a>this page!</a>
          </Link>
        </p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
    </Layout>
  );
}
