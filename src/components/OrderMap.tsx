import React, { useEffect, useState } from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import { useAction } from '../hooks/useAction';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { Coordinates, jsx } from '../types/orderTaxi'

const OrderMap: React.FC = () => {
    const { setPlace } = useAction();
    const coordinates = useTypedSelector(store => store.order.coordinates);
    const carsList = useTypedSelector(store => store.order.carsList);
    const [carsMarks, setCarsMarks] = useState<jsx>(null);
    useEffect(() => {
        if (carsList && carsList.length !== 0) {
            const placemarks: any[] = carsList.map((car) =>
                (<Placemark key={car.id} geometry={car.coordinates} options={{ preset: 'islands#yellowAutoIcon' }} />)
            )
            setCarsMarks(placemarks);
        }

    }, [carsList])
    const handleMapClick = (e: any) => {
        const coords: Coordinates = e.get('coords');
        const coordsStr: string = coords.reverse().join(',');
        setPlace(coordsStr);
    }

    return (
        <>
            <YMaps>
                <Map onClick={(e: any) => handleMapClick(e)} state={{
                    center: coordinates,
                    zoom: 13,
                    controls: ['zoomControl', 'fullscreenControl'],
                }}
                    modules={['control.ZoomControl', 'control.FullscreenControl', "geolocation", "geocode"]}>
                    <Placemark geometry={coordinates} options={{ preset: 'islands#redDotIcon' }} />
                    {carsMarks}
                </Map>
            </YMaps>
        </>

    );
}

export default OrderMap;
