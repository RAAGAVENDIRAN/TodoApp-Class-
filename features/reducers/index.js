import { combineReducers } from "redux";
import todoReducer from "./todos";
import userReducer from "./users";

//combining Reducers
const rootReducer = combineReducers({
  todo: todoReducer,
  user: userReducer,
});

export default rootReducer;
