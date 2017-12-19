import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from './Login';
import Home from './Profile';
import EventList from './components/EventList'
import UserProfile from './components/UserProfile'
import NewEvent from './components/NewEvent'
import EventDetail from './components/EventDetail'
import * as actions from './actions';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h2>Welcome to ActiVision</h2>
        <ul>
          <li>
            {this.props.loggedIn ? (
              <a
                onClick={e => {
                  e.preventDefault();
                  this.props.logoutUser();
                }}
              >
                Sign Out
              </a>
            ) : (
              <Link to="/login">Go to Login</Link>
            )}
          </li>
          <li>
            <Link to="/home">Go to Home</Link>
          </li>
          <li>
            <Link to="/events">Go to Events</Link>
          </li>
          <li>
            <Link to="/profile">My Profile</Link>
          </li>
        </ul>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/home" component={Home} />
          <Route path="/events/new" component={NewEvent} />
          <Route path="/events/:id" component={EventDetail} />
          <Route path="/events" component={EventList} />
          <Route path="/profile" component={UserProfile} />
          {/* <Route path="/profile" render={() => <Profile user={this.props.}/>} /> */}
        </Switch>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  loggedIn: !!state.auth.currentUser.id
});
export default connect(mapStateToProps, actions)(App);
