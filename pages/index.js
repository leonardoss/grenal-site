import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';

import moment from 'moment';

import { useQuery } from '@apollo/react-hooks';
import MATCHES_QUERY from '../graphql/matches.query';

import MOCK_DATA from '../mock/matches.json';

import {
  withStyles,
  Theme,
  createStyles,
  makeStyles,
} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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
const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function Home() {
  const classes = useStyles();
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
        <title>{siteTitle}</title>
      </Head>
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
            {MOCK_DATA.map((match) => (
              <StyledTableRow key={`match__${match.id}`}>
                <StyledTableCell>{match.number}</StyledTableCell>
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
      <section className={utilStyles.headingMd}>
        <p>
          <Link href="/teams">
            <a>this page!</a>
          </Link>
        </p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
    </Layout>
  );
}
