import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';

import Paper from '@material-ui/core/Paper';

import { Typography } from '@material-ui/core';

const getData = () => {
  return {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My ',
        data: [65, 59, 80, 81, 56, 55, 40],
      },
    ],
  };
};

const RightColumn = (props) => {
  const { matches, getVictories } = props;

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

export default RightColumn;
