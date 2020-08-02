import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/layout/layout';

import { replaceSpecialChars } from '../../utils/utils';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import MOCK_DATA from '../../mock/match.json';

const useStyles = makeStyles({
  root: {
    width: '100%',
    padding: 16,
  },
  matchNumber: {
    marginBottom: 30,
    display: 'flex',
    justifyContent: 'center',
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
    width: 320,

    textAlign: 'right',
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
  } = MOCK_DATA;
  const classes = useStyles();
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
      <div className={classes.root}>
        <div className={classes.header}>
          <div className={classes.matchNumber}>
            <Typography variant="subtitle1">Grenal {number}</Typography>
          </div>
          <div className={classes.scoreBoard}>
            <div className={classes.scoreTeam}>
              <Typography variant="h3">{homeTeam}</Typography>
            </div>
            <div className="logo">
              <img
                src={`/${replaceSpecialChars(homeTeam)}.svg`}
                alt={homeTeam}
                height={100}
                width={100}
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
                height={100}
                width={100}
              />
            </div>
            <div className={classes.scoreTeam}>
              <Typography variant="h3">{awayTeam}</Typography>
            </div>
          </div>
        </div>
        <div className={classes.body}>
          <Typography variant="body1">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est itaque
            beatae corrupti eius nihil quod consequuntur repudiandae blanditiis
            iste dolor accusamus ipsum omnis placeat minus nulla, recusandae,
            vel fugit modi?
          </Typography>
        </div>
      </div>
    </Layout>
  );
};

export default Match;
