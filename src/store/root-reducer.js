import { combineReducers } from "redux";
import { homeReducer } from "../components/Home/reducer";
import { cardReducer } from "../components/Card/reducer";
const reducers = combineReducers({ homeReducer, cardReducer });

export default reducers;
