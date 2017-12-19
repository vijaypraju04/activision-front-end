import { FETCH_EVENTS, FETCH_EVENT } from '../actions'
import _ from 'lodash'

export default function (state = {}, action) {
  switch(action.type) {
    case FETCH_EVENT:
      console.log(action)
      // const event = action.payload
      // const newState = { ...state } // to make sure we still have all our previous events we don't want to throw away
      // newState[event.id] = event
      // return newState
      return { ...state, [action.payload.id]: action.payload }
    case FETCH_EVENTS:
      return _.mapKeys(action.payload, 'id')
    default:
      return state
  }
}
