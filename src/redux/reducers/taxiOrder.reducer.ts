import { UserOrderState, UserAction } from '../../types/orderTaxi'
import { UserActionTypes } from '../../types/orderTaxi'

const initialState: UserOrderState = {
    address: '',
    closestCar: null,
    carsList: null,
    isValidating: false
}

export default (state = initialState, action: UserAction): UserOrderState => {
    switch (action.type) {

        case UserActionTypes.SET_ADDRESS:
            return { ...state, address: action.payload }

        default:
            return state
    }
}
