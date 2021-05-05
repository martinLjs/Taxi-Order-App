import { getData } from './../../api/index';
import { UserActionTypes } from '../../types/orderTaxi'
import { Dispatch } from 'redux'
import { UserAction } from '../../types/orderTaxi'
// export const setAddress = (address: string) => {
//     return (dispatch: Dispatch<UserAction>) => {
//         dispatch({ type: UserActionTypes.SET_ADDRESS, payload: address })
//     }

// }
export const getPlace = (address: string) => {
    return (dispatch: any) => {
        //Dispatch<UserAction> not any
        dispatch(loadOn())
        getData(`https://geocode-maps.yandex.ru/1.x/?apikey=471e0e07-9df5-4819-90db-5510c94c00c4&format=json&geocode=${address}`)
            .then(
                (res: any) => {
                    dispatch(loadOff())
                    console.log(res)
                    if (res.response) {
                        const addresses = res.response.GeoObjectCollection.featureMember;
                        addresses.filter((e: any) => e.GeoObject.description === 'Москва, Россия')
                        if (addresses[0]) {
                            const addressCoordinates = addresses[0].GeoObject.Point.pos.split(' ');
                            const newCoordinates = [Number(addressCoordinates[1]), Number(addressCoordinates[0])]
                            dispatch(setCoordinates(newCoordinates))
                        }
                    }
                }
            )
            .catch(
                dispatch(loadOff())
            )

    }
}
export const setAddress = (address: string) => {
    return ({ type: UserActionTypes.SET_ADDRESS, payload: address })
}
export const loadOn = () => {
    return ({ type: UserActionTypes.START_LOADING })
}
export const loadOff = () => {
    return ({ type: UserActionTypes.FINISH_LOADING })
}
export const setCoordinates = (coordinates: number[]) => {
    return ({ type: UserActionTypes.SET_COORDINATES, payload: coordinates })
}



//thunks

