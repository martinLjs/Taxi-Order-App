

//actions

export interface setAddressAction {
    type: string,
    payload: any,
}

export type UserAction = setAddressAction

export enum UserActionTypes {
    SET_ADDRESS = 'SET_ADDRESS',
    FINISH_LOADING = 'FINISH_LOADING',
    START_LOADING = 'START_LOADING',
    SET_COORDINATES = 'SET_COORDINATES',
    SET_VALIDATED_STATUS = 'SET_VALIDATED_STATUS',
    SET_CARS = 'SET_CARS',
    SET_CLOSEST_CAR = 'SET_CLOSEST_CAR',
    SET_SELECTED_CAR = 'SET_SELECTED_CAR',
    LAUNCH_ORDER = 'LAUNCH_ORDER',
}

//react
export type jsx = Array<React.ComponentType> | null

export interface orderData {
    source_time: number,
    addresses: {
        address: string,
        lat: number,
        lon: number
    }[],
    crew_id: number
}

//states
export interface CarInfo {
    name: string,
    color: string,
    distance: number,
    number: string,
    coordinates: Coordinates,
    code: string,
    id: number,
}
export type CarsList = Array<CarInfo>

export type Coordinates = number[];

//store
export interface OrderState {
    address: string,
    closestCar: CarInfo | null,
    carsList: CarsList | null,
    coordinates: Coordinates,
    isValidated: boolean,
    isLoading: boolean,
    isOrderLaunched: boolean,
}

//requests

export interface CarSearchRequest {
    source_time: number,
    addresses: adressesList
}

export type adressesList = AddressInfo[]

export interface AddressInfo {
    address: string,
    lat: number,
    lon: number
}
