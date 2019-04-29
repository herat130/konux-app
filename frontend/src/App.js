import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import PageNotFound from './components/PageNotFound';
import Layout from './components/Layout';
import Analytics from './containers/Analytics';

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path={'/'} exact component={LandingPage} />
          <Route path={'/analytics'} exact component={Analytics} />
          <Route path={'*'} component={PageNotFound} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
