import { createStore } from "redux";
import rootReducer from "../reducers/index";


console.log(createStore);
console.log(rootReducer);


const store = createStore(rootReducer);

console.log(store);

export default store;
