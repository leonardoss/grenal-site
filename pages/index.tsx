import React, { useRef } from 'react';
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout/layout';

import { makeStyles, createStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import 'chartjs-plugin-datalabels';

import Matches from '../components/Matches';
import RightColumn from '../components/RightColumn';
import WidgetChart from '../components/Widgets/Chart';
import WidgetVictoriesEvolution from '../components/Widgets/VictoriesEvolution';

import MATCHES_QUERY from '../graphql/matches.query';
import { initializeApollo } from '../utils/apollo-client';

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

const sumGoals = (match, array) => {
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

  return array;
};

const getGoals = (matches, isFilter = false, arrayFilter) => {
  let array = [0, 0, 0];
  matches.map((match) => {
    if (arrayFilter) {
      if (arrayFilter.indexOf(match.number) != -1) {
        array = sumGoals(match, array);
      }
    } else {
      array = sumGoals(match, array);
    }
  });

  if (isFilter) {
    return array;
  } else {
    return {
      labels: getLabels(),
      datasets: [
        {
          data: array,
          backgroundColor: getColors(),
          hoverBackgroundColor: getHoverColors(),
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

const sumVictories = (winner, array) => {
  if (winner === 'Grêmio') {
    array[0]++;
  } else if (winner === 'Internacional') {
    array[1]++;
  } else {
    array[2]++;
  }
  return array;
};

const getVictories = (matches, isFilter = false, arrayFilter) => {
  let array = [0, 0, 0];
  matches.map((match) => {
    if (arrayFilter) {
      if (arrayFilter.indexOf(match.number) != -1) {
        array = sumVictories(match.winner, array);
      }
    } else {
      array = sumVictories(match.winner, array);
    }
  });
  if (isFilter) {
    return array;
  } else {
    return {
      labels: getLabels(true),
      datasets: [
        {
          data: array,
          backgroundColor: getColors(),
          hoverBackgroundColor: getHoverColors(),
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

export const getStaticProps = async () => {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: MATCHES_QUERY,
  });

  return {
    props: {
      matches: data?.matches,
    },
  };
};

const IndexPage = (props) => {
  const classes = useStyles();
  const chartVictories = useRef(null);
  const chartGoals = useRef(null);
  const matches = props?.matches;

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
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={9}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Matches
                  chartVictories={chartVictories}
                  chartGoals={chartGoals}
                  matches={matches}
                  getGoals={getGoals}
                  getVictories={getVictories}
                  teamsConfig={teamsConfig}
                />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <WidgetVictoriesEvolution
                matches={matches}
                getVictories={getVictories}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} md={3}>
            <RightColumn />
            <Grid item xs={12}>
              <WidgetChart
                title={'Vitórias'}
                matches={matches}
                chart={chartVictories}
                getData={getVictories}
              />
              <WidgetChart
                title={'Gols'}
                matches={matches}
                chart={chartGoals}
                getData={getGoals}
              />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default IndexPage;
