import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import moment from 'moment';
import Layout from '../../components/layout/layout';

import { replaceSpecialChars } from '../../utils/utils';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import MOCK_DATA_MATCH from '../../mock/match.json';
import MOCK_DATA_GOALS from '../../mock/match_goals.json';

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
  } = MOCK_DATA_MATCH;
  const classes = useStyles();
  const title = `${homeTeam} ${homeScore} x ${awayScore} ${awayTeam} - Grenal ${number} | Grenal.Site`;
  const router = useRouter();
  const { matchNumber } = router.query;

  const getGoals = (type) =>
    MOCK_DATA_GOALS.map((goal) =>
      type === goal.type ? (
        <Typography variant="subtile1" display="block">
          {goal.nickname}
        </Typography>
      ) : null
    );

  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>
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
    </Layout>
  );
};

export default Match;
