import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const UserFollowers = (props) => {
  if (!props.followData){
    return <div> Loading </div>
  }

  console.log("INFOLLOW", props)

  console.log("AGAIN", props.followData.followers)
  const followers = props.followData.followers.map((user) => {
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
    <h3> List of Followers </h3>
    <h5>{followers}</h5>
  </div>

  )
}



export default UserFollowers
