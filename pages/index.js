import React, { useRef } from 'react';
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout/layout';

import { makeStyles, createStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Matches from '../components/Matches';
import RightColumn from '../components/RightColumn';

import { useQuery } from '@apollo/react-hooks';
import MATCHES_QUERY from '../graphql/matches.query';

import MOCK_DATA from '../mock/matches.json';

// const colors = {
//   gremio: '#4169e1',
//   internacional: '#f44336',
// };
const teamsConfig = {
  gremio: {
    name: 'Grêmio',
    slug: 'gremio',
    color: '#4169e1',
    secondaryColor: '#0000FF',
  },
  internacional: {
    name: 'Internacional',
    slug: 'internacional',
    color: '#f44336',
    secondaryColor: '#ff0000',
  },
  empate: {
    name: 'Empate',
    slug: 'empate',
    color: '#666',
    secondaryColor: '#333',
  },
};
const getLabels = (withDraw = false) => {
  let labels = [];
  for (let key in teamsConfig) {
    // console.log('##### teamsConfig[key]', teamsConfig[key]);
    if (teamsConfig[key].slug == 'empate') {
      if (withDraw) {
        labels.push(teamsConfig[key].name);
      }
    } else {
      labels.push(teamsConfig[key].name);
    }
  }
  return labels;
};

const getColors = () => {
  let labels = [];
  for (let key in teamsConfig) {
    labels.push(teamsConfig[key].color);
  }
  return labels;
};

const getHoverColors = () => {
  let labels = [];
  for (let key in teamsConfig) {
    labels.push(teamsConfig[key].secondaryColor);
  }
  return labels;
};

const getGoals = (matches) => {
  let array = [0, 0, 0];
  matches.map((match) => {
    if (match.homeTeam === 'Grêmio') {
      array[0] += match.homeScore;
    } else if (match.awayTeam === 'Grêmio') {
      array[0] += match.awayScore;
    }
    if (match.homeTeam === 'Internacional') {
      array[1] += match.homeScore;
    } else if (match.awayTeam === 'Internacional') {
      array[1] += match.awayScore;
    }
  });

  return {
    labels: getLabels(teamsConfig),
    datasets: [
      {
        data: array,
        backgroundColor: getColors(teamsConfig),
        hoverBackgroundColor: getHoverColors(teamsConfig),
        datalabels: {
          display: true,
          color: 'white',
          font: {
            weight: 'bold',
          },
        },
      },
    ],
  };
};
const getWinners = (matches, isFilter = false, arrayFilter) => {
  let array = [0, 0, 0];
  matches.map((match) => {
    if (arrayFilter) {
      if (arrayFilter.indexOf(match.number) != -1) {
        if (match.winner === 'Grêmio') {
          array[0]++;
        } else if (match.winner === 'Internacional') {
          array[1]++;
        } else {
          array[2]++;
        }
      }
    } else {
      if (match.winner === 'Grêmio') {
        array[0]++;
      } else if (match.winner === 'Internacional') {
        array[1]++;
      } else {
        array[2]++;
      }
    }
  });
  if (isFilter) {
    return array;
  } else {
    return {
      labels: getLabels(teamsConfig, true),
      datasets: [
        {
          data: array,
          backgroundColor: getColors(teamsConfig),
          hoverBackgroundColor: getHoverColors(teamsConfig),
          datalabels: {
            display: true,
            color: 'white',
            font: {
              weight: 'bold',
            },
          },
        },
      ],
    };
  }
};
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      // display: 'flex',
    },
    rightAlign: {
      marginLeft: 'auto',
      marginRight: -12,
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    content: {
      paddingTop: 20,
    },
  })
);

export default function Home() {
  const matches = MOCK_DATA;
  const classes = useStyles();
  const inputEl = useRef(null);

  // console.log('##### 2 - Home');

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
        <title>{siteTitle} - title index </title>
      </Head>
      <Container maxWidth={false} className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={9}>
            <Paper className={classes.paper}>
              <Matches
                inputEl={inputEl}
                matches={matches}
                getWinners={getWinners}
                teamsConfig={teamsConfig}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <Paper className={classes.paper}>
              <RightColumn
                inputEl={inputEl}
                matches={matches}
                // teamsConfig={teamsConfig}
                // getLabels={getLabels}
                // getColors={getColors}
                // getHoverColors={getHoverColors}
                getGoals={getGoals}
                getWinners={getWinners}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}
