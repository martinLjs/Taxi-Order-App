import React from 'react'
import { useTypedSelector } from '../hooks/useTypedSelector'
import LocalTaxiIcon from '@material-ui/icons/LocalTaxi';

const SelectedCar: React.FC = () => {

    const carInfo = useTypedSelector(state => state.order.closestCar)
    const carElement = carInfo ?
        <div className='selectedCarWrapper'>

            <div>Подходящий экипаж</div>

            <div className='selectedCar'>
                <LocalTaxiIcon />
                <div className='selectedCar__info'>
                    <div className='car__name'>{carInfo.name}</div>
                    <div>{carInfo.color}</div>
                    <div className='car__number'>{carInfo.number}</div>
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
