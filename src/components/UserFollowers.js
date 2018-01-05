import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchUserData } from '../actions'
import withAuth from '../hocs/withAuth';

class UserFollowers extends Component {


  componentDidMount() {
    // console.log(this.props.match.params.id)
    if (!this.props.profile) {
      this.props.fetchUserData(this.props.match.params.id)
    }
  }

  renderFollowers() {
    return this.props.profile.followers.map((follower) => {
        return (
      <Link to={`/profile/${follower.id}`}>
        {follower.username}
      </Link>
    )
    })
  }

  render() {

  if (!this.props.profile){
    return <div> Loading </div>
  }

  console.log(this.props.profile.followers)

  // console.log("FOLLOWINGGGG", props.followData.following.length)

  // const followings = props.followData.following.map((following) => {
  //     return (
  //       <Link to={`/profile/${following.id}`}>
  //     {following.username}
  //   </Link>
  // )
  // })

  return (
    <div>
      <div>
        <div className="text-sx-right">
        <h3> Followers </h3>
          <ul className="list-group">
            {this.renderFollowers()}
          </ul>
      </div>
    </div>
    {/* <h3> Following Count: {props.followData.following.length} </h3> */}
    {/* <h5>{followings}</h5> */}
  </div>

  )
}
}

function mapStateToProps(state) {
  return {
    profile: state.auth.userProfile
  }
}

export default withAuth(connect(mapStateToProps, {fetchUserData})(UserFollowers))
