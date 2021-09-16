import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';

import { RootState } from './redux/store'
import { useTypedSelector } from './hooks/useTypedSelector';
import { useAction } from './hooks/useAction';

import OrderMap from './components/OrderMap'
import CarsList from './components/CarsList';
import SelectedCar from './components/SelectedCar';

import { YYYYmmddhhmmss } from './utils/helpers'
import { CarSearchRequest, orderData } from './types/orderTaxi';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import './styles.sass'

const App: React.FC = () => {

  const { setAddress, getPlace, searchCar, createOrder } = useAction();
  const address = useTypedSelector((store: RootState) => store.order.address);
  const isValidated = useTypedSelector(store => store.order.isValidated)
  const coords = useTypedSelector(store => store.order.coordinates)
  const selectedCar = useTypedSelector(store => store.order.closestCar)
  const isOrderlaunched = useTypedSelector(store => store.order.isOrderLaunched)


  const useStyles = makeStyles((theme) => ({
    textField: {
      marginLeft: theme.spacing(3),
      width: '100ch',
    },
  }));
  const classes = useStyles();



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
    if (address !== '' && isValidated === true && selectedCar) {
      const orderData: orderData = {
        source_time: YYYYmmddhhmmss(),
        addresses: [
          {
            address: address,
            lat: coords[0],
            lon: coords[1]
          }
        ],
        crew_id: selectedCar.id
      }
      createOrder(orderData);
    }
  }


  return (
    <div className='app'>

      <div className='app__details'>Детали заказа</div>

      <div className='form'>
        <div>Откуда </div>
        <div className={classes.textField}>
          <TextField value={address} style={{ margin: 8 }} onChange={(e) => handleInput(e)} id="outlined-basic filled-full-width" label="Outlined" variant="outlined" />
        </div>
      </div>

      <SelectedCar />

      <div className='app__content'>
        <OrderMap />
        <CarsList />
      </div>

      {isValidated && !isOrderlaunched && <div onClick={() => handleOrder()} className='button'><Button color='primary' variant="contained">Заказать</Button></div>}
      {isOrderlaunched && <div className='app__order-alert'>Заказ Создан!</div>}

    </div>

  );
}

export default App;
