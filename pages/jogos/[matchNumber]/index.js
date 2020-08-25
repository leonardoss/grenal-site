import Head from 'next/head';
import Link from 'next/link';
import moment from 'moment';
import Layout from '../../../components/layout/layout';

import { replaceSpecialChars } from '../../../utils/utils';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import RightColumn from '../../../components/RightColumn';

import MATCH_QUERY from '../../../graphql/match.query';
import MATCHES_QUERY from '../../../graphql/matches.query';
import { initializeApollo } from '../../../utils/apollo-client';

const useStyles = makeStyles({
  root: {
    // width: '80%',
    padding: 16,
  },
  matchNumber: {
    marginBottom: 30,
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
  },
  scoreBoard: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 30,
  },
  scoreTeam: {
    width: 350,
    paddingLeft: 16,
    paddingRight: 16,
    '&:first-child': {
      textAlign: 'right',
    },
  },
  scoreGoals: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  logo: {
    height: 60,
    width: 60,
  },
  goalsCol: {
    backgroundColor: '#FF0000',
  },
  body: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    // alignItems: 'flex-start',
  },
  goalsCol: {
    width: 300,
    paddingLeft: 80,
    '&:first-child': {
      borderRight: '1px solid #ccc',
      paddingRight: 80,
      paddingLeft: 0,
      textAlign: 'right',
    },
  },
  goalsList: {
    lineHeight: 1.8,
  },
});

export async function getStaticProps({ params }) {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: MATCH_QUERY,
    variables: { matchId: params.matchNumber },
  });

  return {
    props: {
      match: data.match,
    },
  };
}

export async function getStaticPaths() {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: MATCHES_QUERY,
  });

  return {
    paths: data?.matches.map(({ number }) => ({
      params: {
        matchNumber: number.toString(),
      },
    })),
    fallback: false,
  };
}

const Match = (props) => {
  const classes = useStyles();
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
    goal,
  } = props?.match || {};
  const title = `${homeTeam} ${homeScore} x ${awayScore} ${awayTeam} - Grenal ${number} | Grenal.Site`;

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  // if (error) {
  //   return <p>Error: {JSON.stringify(error)}</p>;
  // }

  const getGoals = (type) =>
    goal.map((index, goal) =>
      type === goal.type ? (
        <Typography variant="subtile1" display="block" key={index}>
          {goal.nickname}
        </Typography>
      ) : null
    );

  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>
      <Container maxWidth={false} className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={9}>
            <div className={classes.root}>
              <div className={classes.header}>
                <div className={classes.matchNumber}>
                  <Typography variant="subtitle1">
                    Grenal {number} - {stadiumName}
                    <br />
                    {tournament} - {moment(date).utc().format('DD/MM/YYYY')}
                    <br />
                    <i>{info}</i>
                  </Typography>
                </div>
                <div className={classes.scoreBoard}>
                  <div className={classes.scoreTeam}>
                    <Typography variant="h4">{homeTeam}</Typography>
                  </div>
                  <div className="logo">
                    <img
                      src={`/${replaceSpecialChars(homeTeam)}.svg`}
                      alt={homeTeam}
                      className={classes.logo}
                    />
                  </div>
                  <div className={classes.scoreGoals}>
                    <Typography variant="h3">{homeScore}</Typography>
                  </div>
                  <div className={classes.scoreVersus}>
                    <Typography variant="h6">x</Typography>
                  </div>
                  <div className={classes.scoreGoals}>
                    <Typography variant="h3">{awayScore}</Typography>
                  </div>
                  <div className="logo">
                    <img
                      src={`/${replaceSpecialChars(awayTeam)}.svg`}
                      alt={awayTeam}
                      className={classes.logo}
                    />
                  </div>
                  <div className={classes.scoreTeam}>
                    <Typography variant="h4">{awayTeam}</Typography>
                  </div>
                </div>
              </div>
              <div className={classes.body}>
                <div className={classes.goalsCol}>
                  <Typography className={classes.goalsList} variant="body1">
                    {getGoals('home')}
                  </Typography>
                </div>
                <div className={classes.goalsCol}>
                  <Typography className={classes.goalsList} variant="body1">
                    {getGoals('away')}
                  </Typography>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={3}>
            <RightColumn />
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default Match;
