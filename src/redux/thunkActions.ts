import { getData } from "../api"
import { loadOff, loadOn, setCoordinates } from "./actionCreators/order"

export const friendsThunk = {

    getPlace: (address: string) => {
        return (dispatch: any) => {
            dispatch(loadOn())
            getData(`https://geocode-maps.yandex.ru/1.x/?apikey=471e0e07-9df5-4819-90db-5510c94c00c4&format=json&geocode=${address}`)
                .then(
                    (res: any) => {
                        dispatch(loadOff())
                        if (res.response) {
                            const addresses = res.response.GeoObjectCollection.featureMember;
                            addresses.filter((e: any) => e.GeoObject.description === 'Москва, Россия')
                            const addressCoordinates = addresses[0].GeoObject.Point.pos.split(' ');
                            dispatch(setCoordinates(addressCoordinates))
                        }
                    }
                )

        }
    }
}
