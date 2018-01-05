import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import withAuth from '../hocs/withAuth';
import UserEvents from './UserEvents'
import UserData from './UserDataChart'
import UserFollowers from './UserFollowers'
import UserFollowings from './UserFollowings'
import { fetchUserData, followUser, removeFollow, fetchCategoryList} from '../actions'

class UserProfile extends Component {

  state = {
    id: null
  }

  componentDidMount() {
    // console.log(this.props.match.params.id)
    const id =this.props.match.params.id
    this.setState({id})
    this.getUserPageData()
    // console.log("NOW", this.props)
  }

  componentWillReceiveProps(nextP) {
    // console.log(this.props.match.params.id)

    const id =nextP.id
    if (this.state.id != id) {
      this.setState({id},this.getUserPageData)
    }
      // console.log("NOW", this.props)
  }

  getUserPageData = () =>{
    this.props.fetchUserData(this.props.match.params.id)
    this.props.fetchCategoryList()
  }

  hideButtons = () => {
    const currentUser = this.props.user
    // console.log("BEFORE ARIEL", this.props.match.params.id)
    // console.log("ARIEL", currentUser.id)
    if (this.props.match.params.id == currentUser.id) {
      return (
        <div>
        </div>
      )
    } else {
      return (
        <div>
            <button onClick={this.addFollow}>Follow</button>
            <button onClick={this.removeUserFollow}>Unfollow</button>
          </div>
        )
    }
  }

  addFollow = () => {
    console.log(this.props)
    const followingUser = this.props.profile
    const currentUser = this.props.user
    console.log("followerId", followingUser.id, "userId", currentUser.id)
    this.props.followUser(followingUser.id, currentUser.id)
  }

  removeUserFollow = () => {
    console.log(this.props)
    const otherUser = this.props.profile
    const thisUser = this.props.user
    console.log("followerId", otherUser.id, "userId", thisUser.id)
    this.props.removeFollow(otherUser.id, thisUser.id)
  }

  render() {
    console.log("FOLLOW DATA", this.props.profile)
    console.log("ALMOST DONE", this.props.profile)
    console.log(this.props.categories)
    // debugger
    return (
      <div>
        {this.props.profile ? <h1>Username: {this.props.profile.username}</h1> : <h1>LOADING...</h1>}
        <div>
          <div>
            {this.props.profile ? <img src={this.props.profile.picture} /> : <h1>LOADING...</h1>}
          </div>
        {this.props.profile ? <h5>{this.props.profile.first_name}</h5> : <h1>LOADING...</h1>}
        {this.props.profile ? <h5>{this.props.profile.last_name}</h5> : <h1>LOADING...</h1>}
        {this.props.profile ? <h1>Email: {this.props.profile.email}</h1> : <h1>LOADING...</h1>}
      </div>
    <div>
      {this.props.profile ? <p>Bio: {this.props.profile.bio}</p> : <h1>LOADING...</h1>}
    </div>
    <div>
      {this.hideButtons()}
    </div>
    <div>
      <UserEvents userEvents={this.props.profile}/>
    </div>
    <div>
      {this.props.categories ? <UserData categoryArray={this.props.categories} userInfo={this.props.profile}/> : <h1>LOADING...</h1>}
    </div>
    <div>
      {this.props.profile ?
        <div>
        <h1> Follower Count {this.props.profile.followers.length} </h1>
        <Link to={`/profile/${this.props.profile.id}/followers`}>Followers</Link> </div> :
    <h1>LOADING...</h1>}
    {this.props.profile ?
      <div>
    <h1> Following Count {this.props.profile.following.length} </h1>
    <Link to={`/profile/${this.props.profile.id}/following`}>Following</Link> </div> :
    <h1>LOADING...</h1>}
    </div>
    {/* <div>

      {this.props.profile ? <UserFollowings /> :
    <h1>LOADING...</h1>}
    </div> */}
    <div>

    </div>
      </div>
    )
  }
}

// function mapStateToProps({ auth }, ownProps) {
//   return { profile: auth }
// }

function mapStateToProps(state) {
  return {
    profile: state.auth.userProfile,
    categories: state.categories,
    loggedIn: !!state.auth.currentUser.id
  }
}

export default withAuth(connect(mapStateToProps, {fetchUserData, followUser, removeFollow, fetchCategoryList}) (UserProfile))
