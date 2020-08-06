import React, { useRef, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';

import Paper from '@material-ui/core/Paper';

import { replaceSpecialChars } from '../../utils/utils';
import { Typography } from '@material-ui/core';

const RightColumn = (props) => {
  const { matches, chartWinners, chartGoals, getWinners, getGoals } = props;

  return (
    <>
      <Paper elevation={0}>
        <Typography variant="h6">Vitórias </Typography>
        <br />
        <Doughnut
          ref={chartWinners}
          data={getWinners(matches)}
        />
      </Paper>
      <Paper elevation={0}>
        <Typography variant="h6">Gols</Typography>
        <br />
        <Doughnut ref={chartGoals} data={getGoals(matches)} />
      </Paper>
    </>
  );
};

export default RightColumn;
