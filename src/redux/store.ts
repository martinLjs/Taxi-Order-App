
import { createStore } from 'redux'
import { combineReducers } from 'redux'
import orderReducer from './reducers/taxiOrder.reducer'

const rootReducer = combineReducers({
    order: orderReducer
})
const store = createStore(rootReducer)

export type RootState = ReturnType<typeof rootReducer>

export default store;
