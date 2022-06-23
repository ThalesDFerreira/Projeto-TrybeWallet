export const EMAIL_ACTION = 'EMAIL_ACTION';
export const WALLET_ACTION = 'WALLET_ACTION';

export const infoUser = (email) => ({ type: EMAIL_ACTION, email });

export const infoWallet = (state) => (
  {
    type: WALLET_ACTION,
    payload: state,
  }
);
