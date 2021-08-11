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
      client
    },
  } = action;
  try {

    const { response } = yield call(
      api.fetchSale,
      product,
      client
    );
      yield put(actions.fetchSaleSuccess({
        sales: response,
        
      }),
      );
    
  } catch (error) {
    yield put(actions.fetchSaleFail({
      message: error.message,
    }));
  }
}


function* SaleSaga() {

  yield takeLatest(
    types.SALES_FETCHED,
    saleFetcher,
  );
}

export default SaleSaga;