import Head from 'next/head';

import { makeStyles, createStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

export const siteTitle = 'Grenal.site - Histórico, estatísticas, artilheiros';
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

export default function Layout({ children, home }) {
  const classes = useStyles();

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h5">Grenal.site</Typography>
          <div className={classes.rightAlign}>
            <Typography variant="subtitle1">
              Histórico, estatísticas, artilheiros
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <Container maxWidth={false} className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={classes.paper}>{children}</Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={classes.paper}>jose</Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </>
  );
}
