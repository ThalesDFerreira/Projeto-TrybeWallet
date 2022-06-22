import { EMAIL_ACTION } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case EMAIL_ACTION:
    return { ...state, email: action.email };
  default:
    return state;
  }
};

export default userReducer;
