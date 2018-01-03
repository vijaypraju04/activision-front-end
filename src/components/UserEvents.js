import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const UserEvents = (props) => {
  if (!props.userEvents){
    return <div> Loading </div>
  }

  console.log(props.userEvents.events)
  const events = props.userEvents.events.map((event) => {
      return (
        <li>
        <Link to={`/events/${event.id}`}>
      {event.title}
    </Link>
  </li>
  )
  })

  return (
    <div>
    <h3> List of Upcoming Events </h3>
    <h5>{events}</h5>
  </div>

  )
}



export default UserEvents
