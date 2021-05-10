import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';

import { RootState } from './redux/store'
import { useTypedSelector } from './hooks/useTypedSelector';
import OrderMap from './components/OrderMap'
import { YYYYmmddhhmmss } from './utils/helpers'
import { useAction } from './hooks/useAction';
import { CarSearchRequest } from './types/orderTaxi';
import CarsList from './components/CarsList';
import SelectedCar from './components/SelectedCar';

const App: React.FC = () => {

  const { setAddress, getPlace, searchCar } = useAction();
  const address = useTypedSelector((store: RootState) => store.order.address);
  const isValidated = useTypedSelector(store => store.order.isValidated)
  const coords = useTypedSelector(store => store.order.coordinates)

  useEffect(() => {
    if (isValidated) {
      const request: CarSearchRequest = {
        source_time: YYYYmmddhhmmss(),
        addresses: [{
          address: address,
          lat: coords[0],
          lon: coords[1]
        }]
      }
      searchCar(request)
    }

  }, [isValidated])


  const handleInput = (e: any): void => {
    setAddress(e.target.value);
    getPlace(address);

  }
  const handleOrder = () => {

  }
  return (
    <div>
      <div>Детали заказа</div>
      <SelectedCar />
      <div>
        <span >Откуда </span>
        <TextField value={address} onChange={(e) => handleInput(e)} id="outlined-basic" label="Outlined" variant="outlined" />
      </div>
      <OrderMap />
      <CarsList />
      {isValidated && <div onClick={() => handleOrder}>Заказать</div>}
    </div>

  );
}

export default App;
