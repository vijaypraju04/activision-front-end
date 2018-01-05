import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Card, Icon } from 'semantic-ui-react'

const UserEvents = (props) => {
  if (!props.userEvents){
    return <div> Loading </div>
  }

  console.log("CHECKTHISONE", props.userEvents)

  // console.log(props.userEvents.events)
  const events = props.userEvents.events.map((event) => {
      return (
        <Card>
          <Link to={`/events/${event.id}`}>
          <Card.Content header={event.title}/>
        </Link>
        <Card.Content description={event.date} />
      </Card>
  )
  })

  return (
    <div>
    <h3> List of Upcoming Events </h3>
    <Card.Group itemsPerRow={2}>
      {events}
  </Card.Group>
  </div>

  )
}



export default UserEvents
