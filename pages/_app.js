import React from 'react';
import App from 'next/app';
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
    fontSize: 18,
    h5: {
      fontWeight: 700,
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
