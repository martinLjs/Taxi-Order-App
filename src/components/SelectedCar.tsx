import React from 'react'
import { useTypedSelector } from '../hooks/useTypedSelector'

const SelectedCar: React.FC = () => {

    const carInfo = useTypedSelector(state => state.order.closestCar)
    const carElement = carInfo ?
        <div>
            <div>Подходящий экипаж:</div>
            <div>
                <div>icon</div>
                <div>{carInfo.name}</div>
                <div>{carInfo.color}</div>
                <div>{carInfo.number}</div>
            </div>
        </div> : null
    return (
        <>
            {carElement}
        </>
    )
}
export default SelectedCar
