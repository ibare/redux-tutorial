import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reducer from './app/reducer';
import App from './app';
import reduxThunk from 'redux-thunk';
import createlogger from 'redux-logger';
import DevTools from './components/devtools';

const store = createStore(
  reducer,
  compose(
    applyMiddleware(
      reduxThunk,
      createlogger()
    ),
    DevTools.instrument()
  )
);

// let unsubscripbe = store.subscribe(() => console.log('change ==>', store.getState()));

ReactDOM.render(
  <Provider store={ store }>
    <div>
      <Router history={ hashHistory }>
        <Route path="/" component={ App } />
      </Router>
      <DevTools />
    </div>
  </Provider>, document.getElementById('root')
);
