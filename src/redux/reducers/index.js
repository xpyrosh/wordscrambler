import { combineReducers } from "redux";
// import reducers:
import { sentenceReducer } from "./sentenceReducer";

export default combineReducers({
    // set all reducers below
    sentence: sentenceReducer,
});
