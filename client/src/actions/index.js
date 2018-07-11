//Action names
export const CHOOSE_ADVERTISEMENT = "CHOOSE_ADVERTISEMENT";
export const ADD_TEXT = 'redux.ADD_TEXT';

//Actions
export const chooseAdvertisement = data => ({ type: CHOOSE_ADVERTISEMENT, payload: data });
export const addText = data => ({ type: ADD_TEXT, payload: data });
