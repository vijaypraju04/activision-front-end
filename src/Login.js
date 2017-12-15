import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from './actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      error: false,
      fields: {
        username: '',
        password: ''
      }
    };
  }

  handleChange = e => {
    const newFields = { ...this.state.fields, [e.target.name]: e.target.value };
    this.setState({
      fields: newFields
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { fields: { username, password } } = this.state; // current state
    this.props.loginUser(username, password, this.props.history);
  };

  render() {
    const { fields } = this.state;
    return (
      <div>
        {this.state.error ? <h1>Try Again</h1> : null}
        <div className="ui form">
          <form onSubmit={this.handleSubmit}>
            <div className="ui field">
              <label>Username</label>
              <input
                name="username"
                placeholder="username"
                value={fields.username}
                onChange={this.handleChange}
              />
            </div>
            <div className="ui field">
              <label>Password</label>
              <input
                name="password"
                type="password"
                placeholder="password"
                value={fields.password}
                onChange={this.handleChange}
              />
            </div>
            <button type="submit" className="ui basic green button">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     current_user: state.users.current_user
//   };
// };
//
// const mapDispatchToProps = dispatch => {
//   return {
//     loginUser: (userState) => dispatch(actions.loginUser(userState))
//   }
// }

export default withRouter(connect(null, actions)(Login));
