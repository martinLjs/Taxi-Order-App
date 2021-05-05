import { UserOrderState, UserAction, UserActionTypes } from '../../types/orderTaxi'

const initialState: UserOrderState = {
    address: '',
    coordinates: [55.762115, 37.609631],
    closestCar: null,
    carsList: null,
    isValidating: false,
    isLoading: false,
}

export default (state = initialState, action: UserAction): UserOrderState => {
    switch (action.type) {

        case UserActionTypes.SET_ADDRESS:
            return { ...state, address: action.payload }
        case UserActionTypes.START_LOADING:
            return { ...state, isLoading: true }
        case UserActionTypes.FINISH_LOADING:
            return { ...state, isLoading: false }
        case UserActionTypes.SET_COORDINATES:
            return { ...state, coordinates: action.payload }


        default:
            return state
    }
}

