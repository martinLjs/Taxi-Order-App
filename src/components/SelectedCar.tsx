import React from 'react'
import { useTypedSelector } from '../hooks/useTypedSelector'
import LocalTaxiIcon from '@material-ui/icons/LocalTaxi';

const SelectedCar: React.FC = () => {

    const carInfo = useTypedSelector(state => state.order.closestCar)
    const carElement = carInfo ?
        <div className='wrapper'>

            <div>Подходящий экипаж</div>

            <div className='selected-car'>
                <LocalTaxiIcon />
                <div className='selected-car__info'>
                    <div className='selected-car__name'>{carInfo.name}</div>
                    <div>{carInfo.color}</div>
                    <div className='selected-car__number'>{carInfo.number}</div>
                </div>

            </div>
        </div> : null
    return (
        <>
            {carElement}
        </>
    )
}
export default SelectedCar
