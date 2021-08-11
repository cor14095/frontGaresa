
import * as types from '../type/sale'


export const fetchSale = ({
  product,
  client
}) => ({
  type: types.SALES_FETCHED,
  payload: {
    product,
    client
  }
});

export const fetchSaleSuccess = ({
  sales,
}) => ({
  type: types.SALES_FETCHED_SUCCEDDED,
  payload: {
    sales
  }
});

export const fetchSaleFail = ({
  message,
}) => ({
  type: types.SALES_FETCHED_FAILED,
  payload: {
    message,
  }
});