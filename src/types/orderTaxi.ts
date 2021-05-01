export interface UserOrderState {
    address: string,
    closestCar: object | null,
    carsList: object | null,
    isValidating: boolean,
}
export interface setAddressAction {
    type: string,
    payload: string,
}
export type UserAction = setAddressAction

export enum UserActionTypes {
    SET_ADDRESS = 'SET_ADDRESS'
}
