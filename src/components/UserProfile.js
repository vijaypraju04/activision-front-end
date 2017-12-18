import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import withAuth from '../hocs/withAuth';

class UserProfile extends Component {
  render() {
    return (
      <div>
        My Profile
      </div>
    )
  }
}

export default withAuth(UserProfile)
