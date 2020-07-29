import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import withData from '../utils/apollo-client';

import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme } from '@material-ui/core/styles';

import orange from '@material-ui/core/colors/orange';

import 'fontsource-roboto';
const theme = createMuiTheme({
  palette: {
    primary: {
      light: orange[300],
      main: orange[700],
    },
  },
  typography: {
    fontFamily: 'Roboto',
    fontSize: 16,
    h5: {
      fontWeight: 700,
    },
  },
  overrides: {
    MUIDataTable: {
      paper: {
        boxShadow: 'none',
      },
    },
    MUIDataTableHeadCell: {
      fixedHeader: {
        backgroundColor: '#f9f9f9',
      },
    },
    MUIDataTableBodyCell: {
      root: {
        '&:last-child': { padding: 0 },
        cursor: 'pointer',
      },
    },
  },
});

export const siteTitle = 'Grenal.site - Histórico, estatísticas, artilheiros';

const MyApp = (props) => {
  const { Component, pageProps, apollo } = props;

  return (
    <>
      <ApolloProvider client={apollo}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </ApolloProvider>
    </>
  );
};

export default withData(MyApp);
