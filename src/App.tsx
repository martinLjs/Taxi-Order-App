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
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import './styles.sass'

const App: React.FC = () => {

  const { setAddress, getPlace, searchCar } = useAction();
  const address = useTypedSelector((store: RootState) => store.order.address);
  const isValidated = useTypedSelector(store => store.order.isValidated)
  const coords = useTypedSelector(store => store.order.coordinates)

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
    // if (address !== '' &

    // )

  }
  return (
    <div className='container'>
      <div className='details'>Детали заказа</div>

      <div className='Form'>
        <div>Откуда </div>
        <div className={classes.textField}>
          <TextField value={address} style={{ margin: 8 }} fullWidth onChange={(e) => handleInput(e)} id="outlined-basic filled-full-width" label="Outlined" variant="outlined" />
        </div>
      </div>
      <SelectedCar />
      <div className='App__content'>
        <OrderMap />
        <CarsList />
      </div>

      {isValidated && <div className='Button'><Button onClick={() => handleOrder} color='primary' variant="contained">Заказать</Button></div>}
    </div>

  );
}

export default App;
