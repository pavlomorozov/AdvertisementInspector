const initialState = {
  buttonData: 'redux init data here'
};

export const ADD_TEXT = 'redux.ADD_TEXT';

const reduxReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TEXT:
      return { ...state, buttonData: [...state.buttonData, action.payload] };
    default:
      return state;
  }
};

export default reduxReducer;
