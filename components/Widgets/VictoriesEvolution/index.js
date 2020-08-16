import React from 'react';
import { Line } from 'react-chartjs-2';

import Paper from '@material-ui/core/Paper';
import moment from 'moment';

import { Typography } from '@material-ui/core';

import { getYear } from '../../../utils/utils';
import groupBy from 'lodash/groupBy';
import forEach from 'lodash/forEach';

import 'chartjs-plugin-datalabels';

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

const getData = (matches) => {
  const groupedByYear = groupBy(
    matches,
    (item) =>
      Math.floor(getYear(moment(item.date).utc().format('DD/MM/YYYY')) / 10) *
      10
  );
  let labels = [];
  let dataChart = [];

  forEach(groupedByYear, (item, index) => {
    let array = [0, 0, 0];
    labels.push(index);
    item.map((item) => {
      sumVictories(item.winner, array);
    });

    if (dataChart.length > 0) {
      dataChart.push([
        dataChart[dataChart.length - 1][0] + array[0],
        dataChart[dataChart.length - 1][1] + array[1],
        dataChart[dataChart.length - 1][2] + array[2],
      ]);
    } else {
      dataChart.push(array);
    }
  });

  return {
    labels: labels,
    datasets: [
      {
        label: 'Grêmio',
        data: dataChart.map((item) => item[0]),
        borderColor: '#4169e1',
        fill: false,
        datalabels: {
          display: true,
          backgroundColor: 'rgba(0, 0, 255, 0.8)',
          color: 'white',
          borderRadius: 50,
        },
      },
      {
        label: 'Internacional',
        data: dataChart.map((item) => item[1]),
        borderColor: '#f44336',
        fill: false,
        datalabels: {
          display: true,
          backgroundColor: 'rgba(255, 0, 0, 0.8)',
          color: 'white',
          borderRadius: 50,
        },
      },
      {
        label: 'Empate',
        data: dataChart.map((item) => item[2]),
        borderColor: '#666',
        fill: false,
        datalabels: {
          display: true,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          borderRadius: 50,
        },
      },
    ],
  };
};

const VictoriesEvolution = (props) => {
  const { matches } = props;

  return (
    <>
      <Paper elevation={0}>
        <Typography variant="h6">Evolução vitórias </Typography>
        <br />
        <Line data={getData(matches)} />
      </Paper>
    </>
  );
};

export default VictoriesEvolution;
