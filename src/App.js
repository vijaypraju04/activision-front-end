import React, { Component } from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Menu } from 'semantic-ui-react'
import Login from './Login';
import Home from './Profile';
import EventList from './components/EventList'
import UserProfile from './components/UserProfile'
import NewEvent from './components/NewEvent'
import EventDetail from './components/EventDetail'
import NewUser from './components/NewUser'
import UserFollowers from './components/UserFollowers'
import UserFollowings from './components/UserFollowings'
import * as actions from './actions';

class App extends Component {

  userLogged = () => {
    const userId = this.props.user.currentUser.id
    // console.log("BEFORE ARIEL", this.props.match.params.id)
    // console.log("ARIEL", currentUser.id)
    if (this.props.loggedIn == true) {
      return (
        <Menu inverted size='huge'>
          <Menu.Item as='a'>
          <Link to={`/profile/${userId}`}>
          Your Profile
        </Link>
      </Menu.Item>
      <Menu.Item link>
        <Link to="/events">Go to Events</Link>
      </Menu.Item>
      <Menu.Item link>
      <Link to="/events/new">
        Create Event
      </Link>
    </Menu.Item>
      <Menu.Menu position='right'>
      <Menu.Item link>
        <Button primary
        onClick={e => {
          e.preventDefault();
          this.props.logoutUser();
        }}
      >
        Sign Out
      </Button>
      </Menu.Item>
    </Menu.Menu>
    </Menu>
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
        <h2> ActiVision {this.props.loggedIn ? (
          <h2> Welcome {this.props.user.currentUser.username} </h2> ) : null}
        </h2>
            {this.props.loggedIn ? (
null
            ) : (
              <Menu inverted size='huge'>
                <Menu.Item as='a'>
              <Link to="/login">Go to Login</Link>
                </Menu.Item>
               <Menu.Item link>
              <Link to="/register">Register Here</Link>
            </Menu.Item>
          </Menu>

            )}
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
        <Switch>
          <Route path="/login" component={Login} />
          {/* <Route path="/home" component={Home} /> */}
          <Route path="/events/new" component={NewEvent} />
          <Route path="/events/:id" component={EventDetail} />
          <Route path="/events" component={EventList} />
          <Route path="/profile/:id/followers" component={UserFollowers} />
          <Route path="/profile/:id/following" component={UserFollowings} />
          <Route path="/profile/:id" render={router=>{
            // debugger
            const id  = router.match.params.id
            return<UserProfile  id={id} match={router.match}/>
          }} />
          <Route path="/register" component={NewUser} />
          {/* <Route path="/profile/:id" render={() => <UserProfile loggedIn={this.props.loggedIn}/>} /> */}
          {/* <Route path="/profile/:id/followers" component={UserFollowers} /> */}
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
