
import { adapter } from '../services';

export const fetchUser = () => dispatch => {
  dispatch({ type: 'ASYNC_START' });
  adapter.auth.getCurrentUser().then(user => {
    dispatch({ type: 'SET_CURRENT_USER', user });
  });
};

export const loginUser = (username, password, history) => dispatch => {
  dispatch({ type: 'ASYNC_START' });

  adapter.auth.login({ username, password }).then(user => {
    localStorage.setItem('token', user.jwt);
    dispatch({ type: 'SET_CURRENT_USER', user });
    history.push('/home');
  });
};

export const logoutUser = () => {
  localStorage.removeItem('token');
  return { type: 'LOGOUT_USER' };
};

const ROOT_URL = "http://localhost:3000/api/v1"

export const FETCH_EVENTS = "FETCH_EVENTS"
export const CREATE_EVENT = "CREATE_EVENT"
export const FETCH_EVENT = "FETCH_EVENT"
export const ADD_USER_TO_EVENT = "ADD_USER_TO_EVENT"

export const FETCH_CATEGORIES = "FETCH_CATEGORIES"

export const CREATE_USER = "CREATE_USER"
export const FETCH_USER_DATA = "FETCH_USER_DATA"

export function fetchCategories() {
  return dispatch => {
    return fetch(`${ROOT_URL}/categories`)
    .then(res => res.json())
    .then(res => {
      dispatch({
        type: FETCH_CATEGORIES,
        payload: res
      })
    })
  }
}

export function fetchUserData(id) {
  return dispatch => {
    return fetch(`${ROOT_URL}/users/${id}`)
    .then(res => res.json())
    .then(res => {
      dispatch({
        type: FETCH_USER_DATA,
        payload: res
      })
    })
  }
}

export function fetchEvents() {
  return dispatch => {
    return fetch(`${ROOT_URL}/events`)
    .then(res => res.json())
    .then(res => {
      dispatch({
        type: FETCH_EVENTS,
        payload: res
      })
    })
  }
}

export function createEvent(values, callback) {
  return dispatch => {
    // return fetch(`${ROOT_URL}/events`, {}).then(r=>r.json()).then(d=>{debugger})
    return fetch(`${ROOT_URL}/events`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)})
    .then(res => res.json())
    .then(res => {
      dispatch({
      type: CREATE_EVENT,
      payload: res
    })
  }).then(() => callback())

  }
}

export function fetchEvent(id) {
  return dispatch => {
    return fetch(`${ROOT_URL}/events/${id}`)
    .then(res => res.json())
    .then(res => {
      dispatch({
        type: FETCH_EVENT,
        payload: res
      })
    })
  }
}

export function createUser(values) {
  return dispatch => {
    // return fetch(`${ROOT_URL}/events`, {}).then(r=>r.json()).then(d=>{debugger})
    return fetch(`${ROOT_URL}/users`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)})
    .then(res => res.json())
    .then(res => {
      dispatch({
      type: CREATE_USER,
      payload: res
    })
  })
  }
}


export function addUserToEvent(eventId, userId) {
  return dispatch => {
    // return fetch(`${ROOT_URL}/events`, {}).then(r=>r.json()).then(d=>{debugger})
    return fetch(`${ROOT_URL}/user_events`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({user_event: {event_id: eventId, user_id: userId}})
  })
    .then(res => res.json())
    .then(res => {
      if (!res.error) {
        console.log('1234', res)
        dispatch({
          type: ADD_USER_TO_EVENT,
          payload: res
        })
      } else {
        console.log('error')
      }
  })
  }
}





/// data down is mapStateToProps

// action up is mapDispatchToProps
