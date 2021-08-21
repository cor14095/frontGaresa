import {
  put,
  takeLatest,
  call,
  //all,
  //select
} from 'redux-saga/effects';
import * as types from '../type/sale';
import * as actions from '../action/sale';
import * as api from '../api/sale';


function* saleFetcher(action) {
  const {
    payload: {
      product,
      client,
      month,
      year,
    },
  } = action;
  try {
    const { response } = yield call(
      api.fetchSale,
      product,
      client,
      month,
      year,
    );
    yield put(
      actions.fetchSaleSuccess({
        sales: response,
      }),
    );
  } catch (error) {
    yield put(actions.fetchSaleFail({
      message: error.message,
    }));
  }
}

function* saleForecastFetcher(action) {
  const {
    payload: {
      product,
      client,
      year,
      month,
      day,
      week,
    },
  } = action;
  try {
    const { response } = yield call(
      api.fetchSaleForecast,
      product,
      client,
      year,
      month,
      day,
      week,
    );
    yield put(
      actions.fetchSaleForecastSuccesss({
        forecast: response,
      }),
    );
  } catch (error) {
    yield put(actions.fetchSaleForecastFail({
      message: error.message,
    }));
  }
}

function* SaleSaga() {
  yield takeLatest(
    types.SALES_FETCHED,
    saleFetcher,
  );
  yield takeLatest(
    types.SALES_FORECAST_FETCHED,
    saleForecastFetcher,
  );
}

export default SaleSaga;