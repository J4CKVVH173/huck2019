import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../Home/Home';
import NotFound from '../NotFound/NotFound';

const Router = () => (
  <Switch>
    <Route exact path='/' component={Home}/>
    <Route component={NotFound}/>
  </Switch>
);

export default Router;
