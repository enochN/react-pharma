import {combineReducers, createStore} from "redux";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import products from "./reducers/products";

const persistConfig = {
    key: 'root',
    storage,
};
const rootReducer = combineReducers({products});
const persistedReducer = persistReducer(persistConfig, rootReducer);

let store = createStore(persistedReducer);
let persistor = persistStore(store);

export default {store, persistor}