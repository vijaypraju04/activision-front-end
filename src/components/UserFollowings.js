import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchUserData } from '../actions'
import withAuth from '../hocs/withAuth';
import { Card, Icon, Image } from 'semantic-ui-react'

class UserFollowings extends Component {


  componentDidMount() {
    // console.log(this.props.match.params.id)
    if (!this.props.profile) {
      this.props.fetchUserData(this.props.match.params.id)
    }
  }

  renderFollowings() {
    return this.props.profile.following.map((following) => {
        return (
          <Card>
        <Image src={following.picture}/>
        <Card.Content>
          <Card.Header>
        {following.first_name} {following.last_name}
      </Card.Header>
      <Card.Meta>
        <Link to={`/profile/${following.id}`}>
        {following.username}
        </Link>
      </Card.Meta>
    </Card.Content>
      <Card.Content extra>
        <a>
          <Icon name='user' />
        {following.email}
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

  console.log(this.props.profile.following)

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
        <h3> Following Users </h3>
            {this.renderFollowings()}
  </div>

  )
}
}

function mapStateToProps(state) {
  return {
    profile: state.auth.userProfile
  }
}

export default withAuth(connect(mapStateToProps, {fetchUserData})(UserFollowings))
