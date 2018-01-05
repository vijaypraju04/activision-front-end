import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchEvent, addUserToEvent } from '../actions'
import { Link } from 'react-router-dom'
import withAuth from '../hocs/withAuth';
import EventUserList from './EventUserList'
import MapContainer from './MapLocation'
import { Grid, Segment } from 'semantic-ui-react'

class EventDetail extends Component {

  componentDidMount() {
    // console.log(this.props.match.params.id)
    if (!this.props.event) {
      this.props.fetchEvent(this.props.match.params.id)
    }
  }

  // renderUserList = () => {
  //
  // }

  attendEvent = () => {
    let currentEvent = this.props.event
    let currentUser = this.props.userInfo.currentUser
    // let userEventObj = {}
    // userEventObj.event_id = currentEvent.id
    // userEventObj.user_id = currentUser.id
    this.props.addUserToEvent(currentEvent.id, currentUser.id)
  }


  render() {
    if (!this.props.event && !this.props.eventUsers){
      return(
        <div>Loading</div>
      )
    }
    const { event } = this.props
    console.log("rendering event detail", this.props.eventUsers)
    console.log("old render", this.props.event)
    // this.props === ownProps these are equal to each other
    // events[this.props.match.params.id]
    return (
      <Grid columns={3} divided textAlign='center'>
        <Grid.Row stretched>
          <Grid.Column>
            <Segment>
        <MapContainer area={this.props.event}/>
      </Segment>
    </Grid.Column>
    <Grid.Column>
      <Segment>
        <h3>{event.title}</h3>
        <p>{event.description}</p>
      </Segment>
      <Segment>
        <h6>{event.location}</h6>
        <h6>{event.address}</h6>
        <h6>{event.date}</h6>
        <h6>{event.time}</h6>
      </Segment>
      <Segment>
        <button onClick={this.attendEvent}>Attend Event</button>
      </Segment>
    </Grid.Column>
    <Grid.Column>
      <Segment compact>
        <EventUserList userList={this.props.event.users}/>
      </Segment>
    </Grid.Column>
  </Grid.Row>
  </Grid>
    );
  }
}

function mapStateToProps({ events, auth }, ownProps) {
  return {
    event: events[ownProps.match.params.id],
    eventUsers: events.eventUsers,
    userInfo: auth
  }
}

export default withAuth(connect(mapStateToProps, { fetchEvent, addUserToEvent }) (EventDetail))
