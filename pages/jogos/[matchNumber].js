import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/layout/layout';

import Typography from '@material-ui/core/Typography';

import MOCK_DATA from '../../mock/match.json';

const Match = (props) => {
  const {
    awayScore,
    awayTeam,
    awayTeamId,
    date,
    homeScore,
    homeTeam,
    homeTeamId,
    id,
    info,
    link,
    number,
    stadiumId,
    stadiumName,
    tournament,
    tournamentId,
  } = MOCK_DATA;
  const title = `${homeTeam} ${homeScore} x ${awayScore} ${awayTeam} - Grenal ${number} | Grenal.Site`;
  const router = useRouter();
  const { matchNumber } = router.query;

  console.log('##### matchNumber  ', matchNumber);
  console.log('##### awayScore  ', awayScore);

  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>
      <>
        <Typography variant="h8">Grenal {number}</Typography>
        <Typography variant="h5">{homeTeam}</Typography>
        <Typography variant="h5">{homeScore}</Typography>
        <Typography variant="h5">X</Typography>
        <Typography variant="h5">{awayScore}</Typography>
        <Typography variant="h5">{awayTeam}</Typography>
      </>
    </Layout>
  );
};

export default Match;
