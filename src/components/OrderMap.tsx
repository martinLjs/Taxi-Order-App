import React, { useEffect, useState } from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import { useAction } from '../hooks/useAction';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { Coordinates } from '../types/orderTaxi'

const OrderMap: React.FC = () => {
    const { setPlace } = useAction();
    const coordinates = useTypedSelector(store => store.order.coordinates);
    const carsList = useTypedSelector(store => store.order.carsList);
    const [carsMark, setCarsMark] = useState(null);
    useEffect(() => {
        carsList?.map((car) => {
            <Placemark geometry={car.coordinates} />
        })
    }, [carsList])
    const handleMapClick = (e: any) => {
        const coords: Coordinates = e.get('coords');
        const coordsStr: string = coords.join(',');
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
                    <Placemark geometry={coordinates} />
                    {carsList}
                </Map>
            </YMaps>
        </>

    );
}

export default OrderMap;
