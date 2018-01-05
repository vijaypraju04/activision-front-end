import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchUserData } from '../actions'
import withAuth from '../hocs/withAuth';
import { Card, Icon, Image } from 'semantic-ui-react'

class UserFollowers extends Component {


  componentDidMount() {
    // console.log(this.props.match.params.id)
    if (!this.props.profile) {
      this.props.fetchUserData(this.props.match.params.id)
    }
  }

  renderFollowers() {
    console.log(this.props.profile)
    return this.props.profile.followers.map((follower) => {
        return (
          <Card>
        <Image src={follower.picture}/>
        <Card.Content>
          <Card.Header>
        {follower.first_name} {follower.last_name}
      </Card.Header>
      <Card.Meta>
        <Link to={`/profile/${follower.id}`}>
        {follower.username}
        </Link>
      </Card.Meta>
    </Card.Content>
      <Card.Content extra>
        <a>
          <Icon name='user' />
        {follower.email}
      </a>
    </Card.Content>
  </Card>
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
        <h3> Followers </h3>
            {/* <Card.Group itemsPerRow={2}> */}
            {this.renderFollowers()}
          {/* </Card.Group> */}
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
