import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Card, Icon } from 'semantic-ui-react'

const EventUserList = ({userList}) => {
  // if (!props){
  //   return <div> Loading </div>
  // }
  console.log("THISONENOW", userList)
  const users = userList.map((user) => {
      return (
        <Card>
            <Link to={`/profile/${user.id}`}>
          <Card.Content header={user.username}/>
          </Link>
          <Card.Content description={user.bio}/>
          <Card.Content extra>
            <Icon name='user' />
            {user.email}
          </Card.Content>
        </Card>
  )
  })

  return (
    <div>
    <h3> List of Users Attending </h3>
    <Card.Group itemsPerRow={2}>
    {users}
  </Card.Group>
</div>
  )
}



export default EventUserList
