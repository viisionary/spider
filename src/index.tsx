import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import reportWebVitals from './reportWebVitals';
import { history } from "./utils/historyUtils";
import { Router } from 'react-router-dom';
import {createMuiTheme, ThemeProvider } from '@material-ui/core';
import { orange } from '@material-ui/core/colors';
const theme = createMuiTheme({
    palette: {
        // primary:{
        //     main: orange[500],
        // },
        secondary: {
            main: orange[500],
        },
    },
});
ReactDOM.render(
  <React.StrictMode>
      <Router history={history}>
          <ThemeProvider theme={theme}>
          <App />
          </ThemeProvider>
      </Router>
</React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();