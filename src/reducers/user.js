import { EMAIL_ACTION } from '../actions';

const INITIAL_STATE = {
  email: '', // string que armazena o email da pessoa usuária
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case EMAIL_ACTION:
    return { ...state, email: action.email };
  default:
    return state;
  }
};

export default reducer;
