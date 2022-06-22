export const EMAIL_ACTION = 'EMAIL_ACTION';
export const NEW_ACTION2 = 'NEW_ACTION2';

export const infoUser = (email) => ({ type: EMAIL, email });

export const infoUser2 = (state) => ({ type: NEW_ACTION2, payload: state });
