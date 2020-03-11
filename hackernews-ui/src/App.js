import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './assets/css/reset.css';
import './assets/css/style.css';
import Story from './components/Story';
import Header from './components/Header';
import TopStories from './components/TopStories';

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path='/' component={TopStories} />
        <Route exact path='/page' component={TopStories} />
        <Route exact path='/story/' component={Story} />
      </Switch>
    </>
  );
}

export default App;
