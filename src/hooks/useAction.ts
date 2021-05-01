import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as orderActionCreators from '../redux/actionCreators/order'
export const useAction = () => {
    const dispatch = useDispatch()
    return bindActionCreators(orderActionCreators, dispatch)
}