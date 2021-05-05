import React from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import { useAction } from '../hooks/useAction';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { Coordinates } from '../types/orderTaxi'

const OrderMap: React.FC = () => {
    const { setCoordinates } = useAction();
    const coordinates = useTypedSelector(store => store.order.coordinates)
    const handleMapClick = (e: any) => {
        const coords: Coordinates = e.get('coords');
        setCoordinates(coords);
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
                </Map>
            </YMaps>
        </>

    );
}

export default OrderMap;
