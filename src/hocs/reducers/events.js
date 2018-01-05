import { FETCH_EVENTS, FETCH_EVENT, ADD_USER_TO_EVENT, CREATE_EVENT } from '../actions'
import _ from 'lodash'

export default function (state = {}, action) {
  switch(action.type) {
    case ADD_USER_TO_EVENT:
      const eventId = action.payload.event_id
       return {
        ...state,
        [eventId]: {
          ...state[eventId],
          users: [...state[eventId].users, action.payload.user]
        }
      }
      // debugger
      // return {...state, eventUsers: action.payload }
    case FETCH_EVENT:
      console.log("THIS", action.payload)
      // const event = action.payload
      // const newState = { ...state } // to make sure we still have all our previous events we don't want to throw away
      // newState[event.id] = event
      // return newState
      return { ...state, [action.payload.id]: action.payload }
    // case CREATE_EVENT:
    // debugger
    //   console.log(action.payload)
    case FETCH_EVENTS:
      return _.mapKeys(action.payload, 'id')
    default:
      return state
  }
}
