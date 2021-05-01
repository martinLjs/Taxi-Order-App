import React from 'react';
import TextField from '@material-ui/core/TextField';
import { RootState } from './redux/store'
import { useTypedSelector } from './hooks/useTypedSelector';
import OrderMap from './components/OrderMap'
import { useAction } from './hooks/useAction';


const App: React.FC = () => {

  const { setAddress } = useAction();
  const address = useTypedSelector((store: RootState) => store.order.address);
  const handleInput = (e: any): void => {
    setAddress(e.target.value)
  }
  return (
    <div>
      <OrderMap />

      <div>
        <span>Откуда </span>
        <TextField value={address} onChange={(e) => handleInput(e)} id="outlined-basic" label="Outlined" variant="outlined" />
      </div>


    </div>

  );
}

export default App;
