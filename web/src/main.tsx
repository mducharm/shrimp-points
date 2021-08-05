import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Store } from "./store/store";
import { ThemeProvider } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";

const client = new ApolloClient({
  uri: import.meta.env.VITE_API_URL,
  cache: new InMemoryCache(),
});


const theme = createTheme({
  palette: {
    primary: {
      light: '#62727b',
      main: '#37474f',
      dark: '#102027',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#ff867f',
      main: '#ff5252',
      dark: '#c50e29',
      contrastText: '#000000',
    },
  },
});

ReactDOM.render(
  // <React.StrictMode>
    <ApolloProvider client={client}>
      <Store>
        <ThemeProvider theme={theme}>
        <App />
        </ThemeProvider>
      </Store>
    </ApolloProvider>
  // </React.StrictMode>
  ,
  document.getElementById("root")
);
