import { combineReducers } from 'redux'
import advertisementsReducer from './advertisements/AdvertisementsReducer'
import reduxReducer from './redux/reduxReducer'

const rootReducer = combineReducers({
   reduxReducer,
   advertisementsReducer
});

export default rootReducer;
