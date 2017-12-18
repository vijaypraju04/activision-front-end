import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import withAuth from '../hocs/withAuth';
import { fetchEvents } from '../actions'
import _ from 'lodash'

class EventList extends Component {

  componentDidMount() {
    this.props.fetchEvents()
  }

  renderEvents() {
    return _.map(this.props.events, event => {
      return (
        <li className="list-group-item">
          {event.title}
        </li>
      )
    })
  }


  render() {
    console.log(this.props.events)
    return (
      <div>
        <div className="text-sx-right">
          <Link className="btn btn-primary" to="/events/new">
            Create Event
          </Link>
        <h3> Events </h3>
          <ul className="list-group">
            {this.renderEvents()}
          </ul>
      </div>
    </div>
    )
  }
}

function mapStateToProps(state) {
  return {events: state.events}
}

export default connect(mapStateToProps, {fetchEvents})(EventList)
