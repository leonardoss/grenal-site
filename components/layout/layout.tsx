import Head from 'next/head';
import Link from 'next/link'

import { makeStyles, createStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

export const siteTitle = 'Grenal.site - Histórico, estatísticas, artilheiros';
const useStyles = makeStyles((theme) =>
  createStyles({
    rightAlign: {
      marginLeft: 'auto',
      marginRight: -12,
    },
    content: {
      paddingTop: 20,
    },
    logo: {
      marginRight: '4px',
    },
  })
);

const Layout = ({ children, home }: any) => {
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
        {/* <script
          data-ad-client="ca-pub-4543157205566981"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        ></script> */}
      </Head>
      <AppBar position="relative">
        <Toolbar>
          <Link href="/">
            <a>
              <img
                src={`/gremio.svg`}
                height={30}
                width={30}
                className={classes.logo}
              />
              <img
                src={`/internacional.svg`}
                height={30}
                width={30}
                className={classes.logo}
              />
            </a>
          </Link>
          <Typography variant="h5">grenal</Typography>

          <div className={classes.rightAlign}>
            <Typography variant="subtitle1">
              histórico, estatísticas, artilheiros
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>{children}</main>
    </>
  );
}

export default Layout;
