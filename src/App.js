import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Footer from './component/ui/Footer';
import Header from './component/ui/Header';
import FalconFinder from './container/FalconFinder';
import FalconResult from './container/FalconResult';
import ErrorMask from './errorhandler/ErrorMask';
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <ErrorMask>
            <Header></Header>
            <Switch>
              <Route path='/falcon' exact component={FalconFinder} />
              <Route path='/' exact render={() => <Redirect to='/falcon' />} />
              <Route path='/falcon-result' exact component={FalconResult} />
            </Switch>
            <Footer></Footer>
          </ErrorMask>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
