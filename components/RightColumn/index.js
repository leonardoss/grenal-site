import React, { useRef, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';

import Paper from '@material-ui/core/Paper';

import { replaceSpecialChars } from '../../utils/utils';
import { Typography } from '@material-ui/core';

const RightColumn = (props) => {
  const { matches, inputEl, getWinners, getGoals } = props;
  // const inputEl = useRef(null);

  // useEffect(() => {
  //   console.log('##### inputEl ', inputEl);
  // });
  return (
    <>
      <Paper elevation={0}>
        <Typography variant="h6">Vitórias </Typography>
        <br />
        <Doughnut
          // ref={(reference) => (this.chartReference = reference)}
          ref={inputEl}
          data={getWinners(matches)}
        />
      </Paper>
      <Paper elevation={0}>
        <Typography variant="h6">Gols</Typography>
        <br />
        <Doughnut data={getGoals(matches)} />
      </Paper>
    </>
  );
};

export default RightColumn;
