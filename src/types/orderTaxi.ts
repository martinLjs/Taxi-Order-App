

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

}


//states
export interface CarInfo {
    name: string,
    color: string,
    distance: number,
    coordinates: Coordinates,
}
export interface ClosestCar extends CarInfo {
    code: string,
}
export type CarsList = Array<CarInfo>

export type Coordinates = number[];

//store
export interface UserOrderState {
    address: string,
    closestCar: ClosestCar | null,
    carsList: CarsList | null,
    coordinates: Coordinates,
    isValidating: boolean,
    isLoading: boolean,
}
