import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import withAuth from '../hocs/withAuth';
import UserEvents from './UserEvents'
import UserPieData from './UserDataChart'
import UserBarData from './UserDataBar'
import UserFollowers from './UserFollowers'
import UserFollowings from './UserFollowings'
import { fetchUserData, followUser, removeFollow, fetchCategoryList} from '../actions'
import { Grid, Segment, Image, Header } from 'semantic-ui-react'

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
      null
      )
    } else {
      return (
        <Segment>
            <button onClick={this.addFollow}>Follow</button>
            <button onClick={this.removeUserFollow}>Unfollow</button>
          </Segment>
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
    if (!this.props.profile){
      return(
        <div>Loading</div>
      )
    }
    console.log("FOLLOW DATA", this.props.profile)
    console.log("ALMOST DONE", this.props.profile)
    console.log(this.props.categories)
    // debugger
    return (
      <Grid textAlign='center' columns={3} divided>
        <Grid.Row stretched>
          <Grid.Column>
            <Segment>
        <Header size="huge" textAlign='center'>
        {this.props.profile.username}
      </Header>
            <Image src={this.props.profile.picture} circular size='large' centered />
            <p>{this.props.profile.bio}</p>
          </Segment>
            <Segment>
        <h5>{this.props.profile.first_name}</h5>
        <h5>{this.props.profile.last_name}</h5>
        <h1>Email: {this.props.profile.email}</h1>
      {this.hideButtons()}
    {/* <div>
      <UserEvents userEvents={this.props.profile}/>
    </div> */}
    {/* <div>
      {this.props.categories ? <UserData categoryArray={this.props.categories} userInfo={this.props.profile}/> : <h1>LOADING...</h1>}
    </div> */}
      {this.props.profile ?
        <Link to={`/profile/${this.props.profile.id}/followers`}><h1>Followers: {this.props.profile.followers.length}</h1></Link> :
    <h1>LOADING...</h1>}
    {this.props.profile ?
    <Link to={`/profile/${this.props.profile.id}/following`}><h1>Following: {this.props.profile.following.length}</h1></Link> :
    <h1>LOADING...</h1>}
  </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>
            {this.props.categories ? <UserPieData categoryArray={this.props.categories} userInfo={this.props.profile}/> : <h1>LOADING...</h1>}
          </Segment>
          <Segment>
            {this.props.categories ? <UserBarData categoryArray={this.props.categories} userInfo={this.props.profile}/> : <h1>LOADING...</h1>}
          </Segment>
        </Grid.Column>
        <Grid.Column>
        <Segment compact>
          <UserEvents userEvents={this.props.profile}/>
        </Segment>
</Grid.Column>
</Grid.Row>
</Grid>
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
