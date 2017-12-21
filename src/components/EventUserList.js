import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const EventUserList = ({userList}) => {
  // if (!props){
  //   return <div> Loading </div>
  // }
  console.log(userList)
  const users = userList.map((user) => {
      return (
        <li>
        <Link to={`/profile/${user.id}`}>
      {user.username}
    </Link>
  </li>
  )
  })

  return (
    <div>
    <h3> List of Users Attending </h3>
    <h5>{users}</h5>
  </div>

  )
}



export default EventUserList
