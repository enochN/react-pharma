import {combineReducers, createStore} from "redux";
import products from "./reducers/products";

export const store = createStore(combineReducers({products}));