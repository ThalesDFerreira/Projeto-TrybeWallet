export const EMAIL = 'EMAIL';
export const NEW_ACTION2 = 'NEW_ACTION2';

export const infoUser = (email) => ({ type: EMAIL, payload: email });

export const infoUser2 = (state) => ({ type: NEW_ACTION2, payload: state });
