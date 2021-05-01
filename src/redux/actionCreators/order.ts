import { UserActionTypes } from '../../types/orderTaxi'
import { Dispatch } from 'redux'
import { UserAction } from '../../types/orderTaxi'
// export const setAddress = (address: string) => {
//     return (dispatch: Dispatch<UserAction>) => {
//         dispatch({ type: UserActionTypes.SET_ADDRESS, payload: address })
//     }

// }
export const setAddress = (address: string) => {
    return ({ type: UserActionTypes.SET_ADDRESS, payload: address })
}