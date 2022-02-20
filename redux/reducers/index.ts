import { combineReducers } from "redux";
import authReducer from "./authReducer";
import cartReducer from "./cartReducer";

const rootReducer = combineReducers({
  cartReducer
});

export default rootReducer;
