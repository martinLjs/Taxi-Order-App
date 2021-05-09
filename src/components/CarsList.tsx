import React, { useEffect, useState } from 'react'
import { useTypedSelector } from '../hooks/useTypedSelector';
import { placeMarks } from '../types/orderTaxi'


const CarsList: React.FC = () => {
    const carsList = useTypedSelector(store => store.order.carsList);
    const [cars, setCars] = useState<placeMarks>(null)
    if (carsList) {
        const carsInfo: any[] = carsList.map((car) => {
            <div onClick={() => chooseCar(car.id)}>
                <div>icon</div>
                <div>{car.name}</div>
                <div>{car.color}</div>
                <div>{car.distance}</div>
            </div>
        })
        setCars(carsInfo)
    }
    const chooseCar = (id: number) => {

    }
    return (
        <div>
            {cars}
        </div>
    )
}
export default CarsList
