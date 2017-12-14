import 'babel-polyfill';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Main} from './app/main';
import {Footer} from './app/components/layout/Footer';
import {Header} from './app/components/layout/Header';


import {Search} from './app/search/Search';
import {Sidebar} from './app/sidebar/sidebar';
import {Profile} from './app/profile/profile';
import {MedDetails} from './app/meds/MedDetails';
import {MedVideo} from './app/meds/MedVideo';
import {SearchForm} from './app/search/searchForm';
import {SearchBreadcrumb} from './app/search/SearchBreadcrumb';
import {Walkthrough} from './app/components/walkthrough/walkthrough';
import {Accessibility} from './app/components/accessibility/accessibility';
import {Privacy} from './app/components/privacy/privacy';
import userStore from './app/user';
import resourcesStore from './app/search/searchAdvanced/SearchAdvancedResources';
import sidebarResourcesStore from './app/sidebar/sidebarResources';

// Third-party dependencies
import {Router, Route, IndexRoute, useRouterHistory} from 'react-router';
// import injectTapEventPlugin from 'react-tap-event-plugin';
import {createHashHistory} from 'history';
import {Grid, Col} from 'react-bootstrap';
import ReactGA from 'react-ga';
import {autorun} from 'mobx';
import axios from 'axios';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
// injectTapEventPlugin();

// Hash history constant, no querykey
const appHistory = useRouterHistory(createHashHistory)({queryKey: false});

// Set Axios defaults
if (process.env.NODE_ENV === 'develop') {
  axios.defaults.baseURL = 'http://redsep.pythonballz.com/api/v1';
} else if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'https://backend.aprende.edu.mx/api/v1';
}
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// React GA init
ReactGA.initialize('UA-81922406-1');

class App extends Component {
  constructor() {
    super();
    this.state = {
      sidebarShow: false,
      shadowShow: false
    };
  }

  componentDidMount() {
    const _this = this;
    autorun(() => {
      _this.setState({
        sidebarShow: sidebarResourcesStore.sidebarShow,
        shadowShow: resourcesStore.show
      });
    });
  }

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
      <Route path="recurso/:med_id" name="Recurso" staticName={true} component={MedDetails}/>
      <Route path="s" name="Resultados de búsqueda" component={Search}/>
      <Route path="sn" name="Estos son los recursos más nuevos" component={Search}/>
      <Route path="recursos-populares" name="Estos son los recursos más populares en el último mes" component={Search}/>
      <Route path="accesibilidad" name="Accesibilidad" component={Accessibility}/>
      <Route path="politica-privacidad" name="Política de Privacidad" component={Privacy}/>
      <Route path="perfil" name="Perfil" component={Profile}/>
    </Route>
    <Route path="recurso/:med_id/video" component={MedVideo}/>
  </Router>
  ),
  document.getElementById('root')
);
