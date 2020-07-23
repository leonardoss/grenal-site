import React from 'react';
import Link from 'next/link';

import moment from 'moment';

import { withStyles, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const preventDefault = (event) => {
  event.preventDefault();
};
const StyledTableCell = withStyles((theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  })
)(TableCell);
const StyledTableRow = withStyles((theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow);
const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

const Matches = (props) => {
  const classes = useStyles();
  const { matches } = props;

  return (
    <>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Todos os jogosfsdf
      </Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Número</StyledTableCell>
              <StyledTableCell>Mandante</StyledTableCell>
              <StyledTableCell>Placar</StyledTableCell>
              <StyledTableCell>Placar</StyledTableCell>
              <StyledTableCell>Visitante</StyledTableCell>
              <StyledTableCell>Data</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {matches.map((match) => (
              <StyledTableRow key={`match__${match.id}`}>
                <StyledTableCell>
                  <Link href="/teams">
                    <a>{match.number}</a>
                  </Link>
                </StyledTableCell>
                <StyledTableCell>{match.homeTeam}</StyledTableCell>
                <StyledTableCell>{match.homeScore}</StyledTableCell>
                <StyledTableCell>{match.awayScore}</StyledTableCell>
                <StyledTableCell>{match.awayTeam}</StyledTableCell>
                <StyledTableCell>
                  {moment(match.date).utc().format('DD/MM/YYYY')}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={classes.seeMore}>
        <Link href="/teams">
          <a>See more matchess</a>
        </Link>
      </div>
    </>
  );
};

export default Matches;
