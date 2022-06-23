import { CURRENCIES_ACTION } from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CURRENCIES_ACTION:
    return {
      ...state,
      currencies: action.currencies,
    };
  default:
    return state;
  }
};

export default wallet;
