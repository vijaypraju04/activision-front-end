import React from 'react';
import withAuth from './hocs/withAuth';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const Home = props => {
  const userId = props.user.currentUser.id
  console.log(userId)
  return (
    <div>
      <Link to={`/profile/${userId}`}>
      Your Profile
    </Link>
      <h1>Congrats {props.user.currentUser.username} You are Logged In </h1>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth,
})

export default withAuth(connect(mapStateToProps) (Home))
