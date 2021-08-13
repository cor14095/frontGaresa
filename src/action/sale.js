
import * as types from '../type/sale'


export const fetchSale = ({
  product,
  client,
  month,
  year,
}) => ({
  type: types.SALES_FETCHED,
  payload: {
    product,
    client,
    month,
    year,
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

export const fetchSaleForecast = ({
  product,
  client,
  year,
  week,
}) => ({
  type: types.SALES_FORECAST_FETCHED,
  payload: {
    product,
    client,
    year,
    week,
  }
});

export const fetchSaleForecastSuccesss = ({
  forecast
}) => ({
  type: types.SALES_FORECAST_FETCHED_SUCCEDDED,
  payload: {
    forecast
  }
});

export const fetchSaleForecastFail = ({
  message
}) => ({
  type: types.SALES_FORECAST_FETCHED_FAILED,
  payload: {
    message
  }
});