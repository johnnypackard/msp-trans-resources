import React from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Header from './components/Header/Header';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import UserPage from './components/UserPage/UserPage';
import InfoPage from './components/InfoPage/InfoPage';
import AddPage from './components/AddBusinessPage/AddBusinessPage';

import './styles/main.css';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


const styles = {
  root: {

  }
}

const theme = createMuiTheme ({
  constructor() {
    palette: {

    }
  }
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <div>
      <Header title="Project Base" />
      <Router>
        <Switch>
          <Redirect exact from="/" to="/home" />
          <Route
            path="/home"
            component={LoginPage}
          />
          <Route
            path="/register"
            component={RegisterPage}
          />
          <Route
            path="/user"
            component={UserPage}
          />
          <Route
            path="/info"
            component={InfoPage}
          />
          <Route
            path="/add"
            component={AddPage}
          />
          {/* OTHERWISE (no path!) */}
          <Route render={() => <h1>404</h1>} />

        </Switch>
      </Router>
    </div>
  </MuiThemeProvider>

);

export default withStyles(styles)(App);
