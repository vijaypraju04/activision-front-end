import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import authReducer from './reducers/users'
import eventReducer from './reducers/events'


import App from './App';


const rootReducer = combineReducers({
  auth: authReducer,
  events: eventReducer
});

const store = createStore(rootReducer, applyMiddleware(reduxThunk));

const Root = ({ store }) => {
  return (
    <Router>
      <Provider store={store}>
        <Route path="/" component={App} />
      </Provider>
    </Router>
  );
};

ReactDOM.render(<Root store={store} />, document.getElementById('root'));
