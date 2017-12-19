import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchEvent } from '../actions'
import { Link } from 'react-router-dom'

class EventDetail extends Component {

  componentDidMount() {
    // console.log(this.props.match.params.id)
    if (!this.props.event) {
      this.props.fetchEvent(this.props.match.params.id)
    }
  }

  render() {
    if (!this.props.event){
      return(
        <div>Loading</div>
      )
    }
    const { event } = this.props
    console.log('Title', this.props.event.title)
    // this.props === ownProps these are equal to each other
    // events[this.props.match.params.id]
    return (
      <div>
        <Link to="/events">Back to Event list</Link>
        <h3>{event.title}</h3>
        <p>{event.description}</p>
        <h6>{event.location}</h6>
        <h6>{event.address}</h6>
        <h6>{event.date}</h6>
        <h6>{event.time}</h6>
      </div>
    );
  }
}

function mapStateToProps({ events }, ownProps) {
  return { event: events[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchEvent }) (EventDetail)
