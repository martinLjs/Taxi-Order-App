import { CarSearchRequest, CarsList } from './../../types/orderTaxi';
import { getData, getAddress } from './../../api/index';
import { Coordinates, UserActionTypes } from '../../types/orderTaxi'
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
                            console.log(addresses)
                            //filter not work
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
export const setPlace = (coords: string) => {
    return (dispatch: any) => {
        const newCoordinates = coords
            .split(',')
            .reverse()
            .map(i => Number(i));

        dispatch(loadOn())
        getAddress(coords).then(
            (res: any) => {
                dispatch(loadOff())
                dispatch(setCoordinates(newCoordinates))
                dispatch(setAddress(res.response.GeoObjectCollection.featureMember[0].GeoObject.name))
                dispatch(setValidateStatus(true))
            }
        )
            .catch(
                (err) => {
                    dispatch(setCoordinates(newCoordinates))
                    dispatch(setValidateStatus(false))
                    console.log(err)
                }

            )
    }
}
export const searchCar = (requestInfo: CarSearchRequest) => {
    return (dispatch: any) => {
        //send requestInfo on server

        const result = require('../../utils/mocks/carsList.json');
        if (result.code === 0) {
            const carsData = result.data.crews_info;
            const cars = carsData.map((car: any) =>
                ({
                    name: car.driver_name,
                    color: car.color,
                    distance: car.distance,
                    coordinates: [car.lat, car.lon],
                    code: car.code
                })

            )
            dispatch(setCars(cars))
        }
    }


}
export const setAddress = (address: string) => {
    return ({ type: UserActionTypes.SET_ADDRESS, payload: address })
}
export const setCoordinates = (coordinates: number[]) => {
    return ({ type: UserActionTypes.SET_COORDINATES, payload: coordinates })
}
export const setValidateStatus = (val: boolean) => {
    return ({ type: UserActionTypes.SET_VALIDATED_STATUS, payload: val })
}
export const setCars = (carsList: CarsList) => {
    return ({ type: UserActionTypes.SET_CARS, payload: carsList })
}
export const setClosestCar = () => {
    return ({ type: UserActionTypes.SET_CLOSEST_CAR })
}

export const loadOn = () => {
    return ({ type: UserActionTypes.START_LOADING })
}
export const loadOff = () => {
    return ({ type: UserActionTypes.FINISH_LOADING })
}




//thunks

