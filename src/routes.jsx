import React, { Component } from 'react';
import { render } from 'react-dom';
import { browserHistory, Router, Route, Link, Redirect, IndexRoute  } from 'react-router';
import Application from './Application';

render((
  	<Router history={browserHistory}>
    	<Route path="/" component={Application} />
    </Router>
), document.getElementById('root'))
