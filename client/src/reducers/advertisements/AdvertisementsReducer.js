import {CHOOSE_ADVERTISEMENT, GET_AD_DETAILS} from "../../actions/index"

const initialState = {
  chosenAdvertisement: undefined,
  advertisementDetails : undefined,
}

const advertisementsReducer = (state = initialState, action) => {
  switch(action.type) {
    case CHOOSE_ADVERTISEMENT:
      return { ...state, chosenAdvertisement: action.payload }
    case GET_AD_DETAILS:
      return { ...state, advertisementDetails: action.payload }
    default:
      return state;
  }
}

export default advertisementsReducer;
