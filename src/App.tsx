import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';

import { RootState } from './redux/store'
import { useTypedSelector } from './hooks/useTypedSelector';
import OrderMap from './components/OrderMap'
import { useAction } from './hooks/useAction';
import { CarSearchRequest } from './types/orderTaxi';

const App: React.FC = () => {

  const { setAddress, getPlace, searchCar } = useAction();
  const address = useTypedSelector((store: RootState) => store.order.address);
  const isValidated = useTypedSelector(store => store.order.isValidated)
  const coords = useTypedSelector(store => store.order.coordinates)
  const carsList = useTypedSelector(store => store.order.carsList)

  useEffect(() => {
    if (isValidated) {
      const date = new Date();
      //formate
      const request: CarSearchRequest = {
        source_time: 1,
        addresses: [{
          address: address,
          lat: coords[0],
          lon: coords[1]
        }]
      }
      searchCar(request)
    }

  }, [isValidated])

  //add validate checker func

  useEffect(() => {
    // show cars by coords function

  }, [carsList])
  const handleInput = (e: any): void => {
    setAddress(e.target.value);
    getPlace(address);

  }
  const handleOrder = () => {

  }
  return (
    <div>
      <OrderMap />
      <div>
        <span >Откуда </span>
        <TextField value={address} onChange={(e) => handleInput(e)} id="outlined-basic" label="Outlined" variant="outlined" />
      </div>
      {isValidated && <div onClick={() => handleOrder}>Заказать</div>}
    </div>

  );
}

export default App;
