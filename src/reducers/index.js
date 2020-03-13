import { combineReducers } from 'redux';
import productsReducers from './productsReducers';
import alertReducer from './alertReducer';

export default combineReducers({
  products: productsReducers,
  alert: alertReducer
});
