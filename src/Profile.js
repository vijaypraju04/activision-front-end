import React from 'react';
import withAuth from './hocs/withAuth';

const Home = props => {
  console.log(props)
  return (
    <div>
      <h1>Congrats {props.user.username} You are Logged In </h1>
    </div>
  );
};

export default withAuth(Home);
