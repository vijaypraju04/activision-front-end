import React, { Component } from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from './Login';
import Home from './Profile';
import EventList from './components/EventList'
import UserProfile from './components/UserProfile'
import NewEvent from './components/NewEvent'
import EventDetail from './components/EventDetail'
import NewUser from './components/NewUser'
import * as actions from './actions';

class App extends Component {

  userLogged = () => {
    const userId = this.props.user.currentUser.id
    // console.log("BEFORE ARIEL", this.props.match.params.id)
    // console.log("ARIEL", currentUser.id)
    if (this.props.loggedIn == true) {
      return (
        <div>
          <li>
          <Link to={`/profile/${userId}`}>
          Your Profile
        </Link>
      </li>
      <li>
        <Link to="/events">Go to Events</Link>
      </li>
        </div>
      )
    } else {
      return (
        <div>
          </div>
        )
    }
  }

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
              <div>
              <Link to="/login">Go to Login</Link>
              <div>
                <li>
              <Link to="/register">Register Here</Link>
            </li>
            </div>
            </div>
            )}
          </li>
          {/* <li>
            <Link to="/home">Go to Profile</Link>
          </li> */}
          <div>
            {this.userLogged()}
          </div>
          {/* <li>
          <Link to={`/profile/${userId}`}>
          Your Profile
        </Link>
      </li> */}
        </ul>
        <Switch>
          <Route path="/login" component={Login} />
          {/* <Route path="/home" component={Home} /> */}
          <Route path="/events/new" component={NewEvent} />
          <Route path="/events/:id" component={EventDetail} />
          <Route path="/events" component={EventList} />
          <Route path="/profile/:id" render={router=>{
            // debugger
            const id  = router.match.params.id
            return<UserProfile  id={id} match={router.match}/>
          }} />
          <Route path="/register" component={NewUser} />
          {/* <Route path="/profile/:id" render={() => <UserProfile loggedIn={this.props.loggedIn}/>} /> */}
        </Switch>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  loggedIn: !!state.auth.currentUser.id,
  user: state.auth
});
export default connect(mapStateToProps, actions)(App);
