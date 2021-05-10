

//actions
export interface setAddressAction {
    type: string,
    payload: any,
}
// export interface setCoordinatesAction {
//     type: string,
//     payload: number[],
// }

export type UserAction = setAddressAction
// export type UserAction = setAddressAction | setCoordinatesAction

export enum UserActionTypes {
    SET_ADDRESS = 'SET_ADDRESS',
    FINISH_LOADING = 'FINISH_LOADING',
    START_LOADING = 'START_LOADING',
    SET_COORDINATES = 'SET_COORDINATES',
    SET_VALIDATED_STATUS = 'SET_VALIDATED_STATUS',
    SET_CARS = 'SET_CARS',
    SET_CLOSEST_CAR = 'SET_CLOSEST_CAR',
    SET_SELECTED_CAR = 'SET_SELECTED_CAR',
}

//react
export type jsx = Array<React.ComponentType> | null

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
}

//requests
// export interface UserOrderRequest {}

export interface CarSearchRequest {
    // формат времени ГГГГММДДччммсс 
    //str or num?
    source_time: number,
    addresses: adressesList
}
export type adressesList = AddressInfo[]

export interface AddressInfo {
    address: string,
    lat: number,
    lon: number
}
