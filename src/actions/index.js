
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






/// data down is mapStateToProps

// action up is mapDispatchToProps
