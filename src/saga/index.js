import { fork, all } from 'redux-saga/effects';
import SaleSaga from './sale';


function* mainSaga() {
  yield all([
    fork(SaleSaga)
  ]);
}

export default mainSaga;
