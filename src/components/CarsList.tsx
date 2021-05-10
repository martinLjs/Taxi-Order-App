import React, { useEffect, useState } from 'react'
import { useAction } from '../hooks/useAction';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { jsx } from '../types/orderTaxi'


const CarsList: React.FC = () => {

    const { selectCar } = useAction();
    const carsList = useTypedSelector(store => store.order.carsList);
    const [cars, setCars] = useState<jsx>(null)

    useEffect(() => {
        if (carsList) {
            const carsInfo: any[] = carsList.map((car) =>
                <div onClick={() => chooseCar(car.id)}>
                    <div>icon</div>
                    <div>{car.name}</div>
                    <div>{car.color}</div>
                    <div>{car.distance}</div>
                </div>

            )
            setCars(carsInfo)
        }
    }, [carsList])


    const chooseCar = (id: number) => {
        selectCar(id);
    }
    return (
        <div>
            {cars}
        </div>
    )
}
export default CarsList
