import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { createEvent } from '../actions'
import { fetchCategories } from '../actions'
import withAuth from '../hocs/withAuth';
import _ from 'lodash'

class NewEvent extends Component {

  componentDidMount() {
    this.props.fetchCategories()
  }

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
    let userId = this.props.currentUser.currentUser.id
    values["userId"] = userId
    console.log(values)
    let address = values.address
    // let addressObj = {address: address}
    // console.log(addressObj)
    this.props.createEvent(values, address, () => {
      this.props.history.push('/events')
      // this.props.mapLocation(locationInput)
    })
  }

  renderDropDown() {
    return _.map(this.props.categories, category => {
      return (
        <option value={category.id} key={category.id}>{category.name}</option>)
      })
  }


  render() {
    console.log(this.props.currentUser.currentUser.id)
    const { handleSubmit } = this.props
    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this), this.props.currentUser.currentUser.id)}>
          <div>
            <label>Activist Category</label>
              <Field name="category" component="select">
                <option>Select</option>
                {this.renderDropDown()}
                {/* {this.props.categories.map(category => <option value={category.id} key={category.id}>{category.name}</option>)} */}
              </Field>
          </div>
          <Field
            label="Title for Event"
            name="title"
            component={this.renderField}
          />
          <Field
            label="Description of Event"
            name="description"
            component={this.renderField}
          />
          <Field
            label="Address of Event"
            name="address"
            component={this.renderField}
          />
          <Field
            label="Date of Event"
            name="date"
            component={this.renderField}
          />
          <Field
            label="Picture"
            name="picture"
            component={this.renderField}
          />
          <Field
            label="Location of Event"
            name="location"
            component={this.renderField}
          />
          <Field
            label="Time of Event"
            name="time"
            component={this.renderField}
          />
          <button type="submit" className="btn btn-primary">Submit</button>
          <Link to='/events' className="btn btn-danger">Cancel</Link>
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

const mapStateToProps = (state) => ({
  categories: state.categories,
  currentUser: state.auth
})

export default reduxForm({
  validate,
  form: 'NewEventForm'
})(
  withAuth(connect(mapStateToProps, {createEvent, fetchCategories})(NewEvent))
)
