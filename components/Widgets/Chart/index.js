import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const WidgetChart = (props) => {
  const { title, matches, chart, getData } = props;

  return (
    <>
      <Paper elevation={0}>
        <Typography variant="h6">{title}</Typography>
        <br />
        <Doughnut ref={chart} data={getData(matches)} />
      </Paper>
    </>
  );
};

export default WidgetChart;
