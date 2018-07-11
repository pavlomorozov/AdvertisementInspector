import {ADD_TEXT} from "../../actions/index"

const initialState = {
  buttonData: '[redux init data here]'
};

const reduxReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TEXT:
      return { ...state, buttonData: [...state.buttonData, action.payload] };
    default:
      return state;
  }
};

export default reduxReducer;
