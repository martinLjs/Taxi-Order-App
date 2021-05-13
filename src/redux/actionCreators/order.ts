import { CarInfo, CarSearchRequest, CarsList, orderData } from './../../types/orderTaxi';
import { getData, getAddress } from './../../api/index';
import { Coordinates, UserActionTypes } from '../../types/orderTaxi'


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
export const setClosestCars = () => {
    return ({ type: UserActionTypes.SET_CLOSEST_CAR })
}
export const selectCar = (id: number) => {
    return ({ type: UserActionTypes.SET_SELECTED_CAR, payload: id })
}


export const loadOn = () => {
    return ({ type: UserActionTypes.START_LOADING })
}
export const loadOff = () => {
    return ({ type: UserActionTypes.FINISH_LOADING })
}
export const launchedOrder = () => {
    return ({ type: UserActionTypes.LAUNCH_ORDER })
}




//thunks

export const getPlace = (address: string) => {
    return (dispatch: any) => {
        dispatch(loadOn())
        dispatch(setValidateStatus(false))
        getData(`https://geocode-maps.yandex.ru/1.x/?apikey=471e0e07-9df5-4819-90db-5510c94c00c4&format=json&geocode=${address}`)
            .then(
                (res: any) => {
                    dispatch(loadOff())
                    if (res.response) {
                        const addresses = res.response.GeoObjectCollection.featureMember;
                        const relevantAdresses = addresses.filter((e: any) => e.GeoObject.description === 'Москва, Россия')
                        if (relevantAdresses.length !== 0) {
                            const addressCoordinates = relevantAdresses[0].GeoObject.Point.pos.split(' ');
                            const newCoordinates = [Number(addressCoordinates[1]), Number(addressCoordinates[0])]
                            dispatch(setCoordinates(newCoordinates))
                            dispatch(setValidateStatus(true))
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
        dispatch(setValidateStatus(false))
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
            const cars: CarsList = carsData.map((car: any) =>
                ({
                    name: car.car_mark + car.car_model,
                    color: car.car_color,
                    distance: car.distance,
                    number: car.car_number,
                    coordinates: [car.lat, car.lon],
                    code: car.car_code,
                    id: car.crew_id,
                })

            )
            dispatch(setCars(cars))
            dispatch(setClosestCars())
        }
    }


}

export const createOrder = (data: orderData) => {
    return (dispatch: any) => {
        dispatch(loadOn())
        //server request (order data)
        //.then 
        const response = require('../../utils/mocks/orderResult.json');
        if (response.code === 0) {
            dispatch(launchedOrder())
        }
        dispatch(loadOff())

    }
}