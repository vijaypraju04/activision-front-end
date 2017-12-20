import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import { createUser } from '../actions'
import _ from 'lodash'

class NewUser extends Component {

  renderField(field) {
    const { meta: { touched, error } } = field
    const className = `form-group ${touched && error ? 'has-danger' : '' }`;
    return (
      <div className={className}>
      <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        {touched ? error : ''}
      </div>
    );
  }

  onSubmit(values) {
    console.log(values)
    // this.props.history.push('/events')
    this.props.createUser({user: values})
  }

  render() {
    const { handleSubmit } = this.props
    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <div>
          </div>
          <Field
            label="Enter Username"
            name="username"
            component={this.renderField}
          />
          <Field
            label="Enter Password"
            name="password"
            component={this.renderField}
          />
          <Field
            label="First Name"
            name="first_name"
            component={this.renderField}
          />
          <Field
            label="Last Name"
            name="last_name"
            component={this.renderField}
          />
          <Field
            label="Current Address"
            name="address"
            component={this.renderField}
          />
          <Field
            label="Upload User Photo"
            name="picture"
            component={this.renderField}
          />
          <Field
            label="Enter Email"
            name="email"
            component={this.renderField}
          />
          <Field
            label="Enter A Short Bio"
            name="bio"
            component={this.renderField}
          />
          <Field
            label="Enter Your Birthday"
            name="birth_date"
            component={this.renderField}
          />
          <button type="submit" className="btn btn-primary">Submit</button>
          {/* <Link to='/events' className="btn btn-danger">Cancel</Link> */}
        </form>
      </div>
    )
  }
}

function validate(values) {
  const errors = {}

  // validate the inputs from the values object

  if (!values.title ) {
    errors.title = "Enter a title"
  }

  if (!values.description) {
    errors.description = "Enter some description for your event!"
  }

  if (!values.location) {
    errors.location = "Enter a location for the event!"
  }

  if (!values.address) {
    errors.address = "Enter an address for the event!"
  }

  if (!values.date) {
    errors.date = "Enter an address for the event!"
  }

  if (!values.time) {
    errors.time = "Enter a time for the event!"
  }

  // if errors is empty the form is good to submit
  // if errors has any properties redux form assumes form is invalid

  return errors
}



export default reduxForm({
  validate,
  form: 'NewUserForm'
})(
  connect(null, {createUser})(NewUser)
)
