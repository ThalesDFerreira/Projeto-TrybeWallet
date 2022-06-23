export const EMAIL_ACTION = 'EMAIL_ACTION';
export const CURRENCIES_ACTION = 'CURRENCIES_ACTION';

export const infoUser = (email) => ({ type: EMAIL_ACTION, email });

export const infoWallet = (currencies) => (
  {
    type: CURRENCIES_ACTION,
    currencies,
  }
);
