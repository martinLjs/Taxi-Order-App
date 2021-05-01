

//actions
export interface setAddressAction {
    type: string,
    payload: string,
}
export type UserAction = setAddressAction

export enum UserActionTypes {
    SET_ADDRESS = 'SET_ADDRESS'
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
    coordinates: Coordinates | null,
    isValidating: boolean,
}
