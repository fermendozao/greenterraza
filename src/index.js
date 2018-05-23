import 'babel-polyfill';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Main} from './app/main';
import Events from './app/components/Events';
import {Footer} from './app/components/layout/Footer';
import {Header} from './app/components/layout/Header';

// Third-party dependencies
import {Router, Route, IndexRoute, useRouterHistory} from 'react-router';
// import injectTapEventPlugin from 'react-tap-event-plugin';
import {createHashHistory} from 'history';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
// injectTapEventPlugin();

// Hash history constant, no querykey
const appHistory = useRouterHistory(createHashHistory)({queryKey: false});

class App extends Component {

  render() {
    return (
      <div>
        <Header/>
        {this.props.children}
        <Footer/>
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.object.isRequired,
  location: React.PropTypes.object
};

ReactDOM.render(
  (
  <Router history={appHistory}>
    <Route path="/" name="Recursos educativos" component={App}>
      <IndexRoute component={Main}/>
      <Route path="eventos" name="Eventos" component={Events}/>
    </Route>
  </Router>
  ),
  document.getElementById('root')
);
