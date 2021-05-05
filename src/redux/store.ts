
import { createStore, applyMiddleware } from 'redux'
import { combineReducers } from 'redux'
import { composeWithDevTools } from "redux-devtools-extension";

import orderReducer from './reducers/taxiOrder.reducer'
import thunk from 'redux-thunk';
const rootReducer = combineReducers({
    order: orderReducer
})
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export type RootState = ReturnType<typeof rootReducer>

export default store;
