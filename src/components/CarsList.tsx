import React, { useEffect, useState } from 'react'
import { useAction } from '../hooks/useAction';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { jsx } from '../types/orderTaxi'
import LocalTaxiIcon from '@material-ui/icons/LocalTaxi';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const CarsList: React.FC = () => {

    const { selectCar } = useAction();
    const carsList = useTypedSelector(store => store.order.carsList);
    const [cars, setCars] = useState<jsx>(null)

    useEffect(() => {
        if (carsList) {
            const carsInfo: any[] = carsList.map((car) =>
                <div className='carItem' onClick={() => chooseCar(car.id)}>
                    <LocalTaxiIcon />
                    <div className='carItem__info'>
                        <div className='carItem__name'>{car.name}</div>
                        <div className='row'>
                            <div>{car.color}</div>
                            <div>{car.distance + ' m'}</div>
                        </div>

                    </div>
                    <ArrowForwardIosIcon />
                </div>

            )
            setCars(carsInfo)
        }
    }, [carsList])


    const chooseCar = (id: number) => {
        selectCar(id);
    }
    return (
        <div className='carsListWrapper'>
            {cars}
        </div>
    )
}
export default CarsList
