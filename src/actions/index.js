export const EMAIL_ACTION = 'EMAIL_ACTION';
export const CURRENCIES_ACTION = 'CURRENCIES_ACTION';
export const EXPENSES_ACTION = 'EXPENSES_ACTION';
export const UPDATE_EXPENSES_ACTION = 'UPDATE_EXPENSES_ACTION';

export const infoUser = (email) => ({ type: EMAIL_ACTION, email });

export const currenciesWallet = (currencies) => (
  {
    type: CURRENCIES_ACTION,
    currencies,
  }
);

export const expensesWallet = (expenses) => (
  {
    type: EXPENSES_ACTION,
    expenses,
  }
);

export const updateExpensesWallet = (expenses) => (
  {
    type: UPDATE_EXPENSES_ACTION,
    expenses,
  }
);
