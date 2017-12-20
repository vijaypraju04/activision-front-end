import { FETCH_USER_DATA } from '../actions'

const initialState = { currentUser: {} };

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_DATA:
      console.log(action)
      // const event = action.payload
      // const newState = { ...state } // to make sure we still have all our previous events we don't want to throw away
      // newState[event.id] = event
      // return newState
      return { ...state, userProfile: action.payload }
    case 'SET_CURRENT_USER':
    console.log("in the reducer!")
      const { id, username } = action.user;
      return { ...state, currentUser: { id, username } };
    case 'LOGOUT_USER':
      return { ...state, currentUser: {} };
    default:
      return state;
  }
};

export default authReducer
