import { combineReducers } from 'redux';
import { reducer as reducerForm } from 'redux-form';
import sale, * as fromSale from './sale';

export default combineReducers({
  sale,
  form: reducerForm,
});




//sale
export const getAllSale = (state) => fromSale.getAllSale(state.sale);
export const getLoading = (state) => fromSale.getLoading(state.sale);

