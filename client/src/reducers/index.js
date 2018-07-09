import { combineReducers } from 'redux'
//import * as advertisements from './advertisements/reducer'
import reduxReducer from './redux/reduxReducer'
//
const rootReducer = combineReducers({
   reduxReducer
});

console.log(rootReducer);

export default rootReducer;

//const hello = 1234;
//export default hello;
