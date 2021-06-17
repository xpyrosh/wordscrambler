import { combineReducers } from "redux";
// import reducers:
import { scramblerReducer } from "./scramblerReducer";

export default combineReducers({
    // set all reducers below
    scrambler: scramblerReducer,
});
