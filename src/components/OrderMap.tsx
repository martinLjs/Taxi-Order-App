import React from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';


const OrderMap: React.FC = () => {


    return (
        <>
            <YMaps>
                <Map state={{
                    center: [55.75, 37.57],
                    zoom: 9,
                    controls: ['zoomControl', 'fullscreenControl'],
                }}
                    modules={['control.ZoomControl', 'control.FullscreenControl', "geolocation", "geocode"]}>
                    <Placemark defaultGeometry={[55.751574, 37.573856]} />

                </Map>
            </YMaps>
        </>

    );
}

export default OrderMap;
