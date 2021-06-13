import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducer/reducer.js";
import thunk from "redux-thunk";

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export let store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk)),)
export let persistor = persistStore(store)
