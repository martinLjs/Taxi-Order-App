import { OrderState, UserAction, UserActionTypes } from '../../types/orderTaxi'

const initialState: OrderState = {
    address: '',
    coordinates: [55.762115, 37.609631],
    closestCar: null,
    carsList: null,
    isValidated: false,
    isLoading: false,
    isOrderLaunched: false
}

export default (state = initialState, action: UserAction): OrderState => {
    switch (action.type) {


        case UserActionTypes.START_LOADING:
            return { ...state, isLoading: true }
        case UserActionTypes.FINISH_LOADING:
            return { ...state, isLoading: false }
        case UserActionTypes.LAUNCH_ORDER:
            return { ...state, isOrderLaunched: true }
        case UserActionTypes.SET_ADDRESS:
            return { ...state, address: action.payload, isValidated: false }
        case UserActionTypes.SET_COORDINATES:
            return { ...state, coordinates: action.payload }
        case UserActionTypes.SET_VALIDATED_STATUS:
            return { ...state, isValidated: action.payload }
        case UserActionTypes.SET_CARS:
            return { ...state, carsList: action.payload }
        case UserActionTypes.SET_CLOSEST_CAR:
            let cars = state.carsList;
            let car = null;
            if (cars) {
                cars.sort((a, b) =>
                    a.distance - b.distance
                )
                car = cars[0];
            }
            return { ...state, closestCar: car }
        case UserActionTypes.SET_SELECTED_CAR:
            if (state.carsList) {
                let newCar = state.carsList.filter((car) =>
                    car.id === action.payload)
                return { ...state, closestCar: newCar[0] }
            }
            return state;
        default:
            return state;
    }
}

