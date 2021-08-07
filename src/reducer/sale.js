import { combineReducers } from 'redux';
import * as types from '../type/sale';

const stateShape = {
  loading: false,
};

const Sale = (state = stateShape, action) => {
  switch (action.type) {
    case types.SALES_FETCHED: {
      return{
        ...state,
        loading: true,
      }
    }
    case types.SALES_FETCHED_SUCCEDDED: {
      return{
        ...state,
        loading: false,
      }
    }
    default: {
      return state;
    }
  }
};


const byId = (state={}, action) => {
  switch (action.type) {
  
    case types.SALES_FETCHED_SUCCEDDED: {
      const {
        payload: {
          sales,
        },
      } = action;
      const newState = {}
      for (let i in sales) {
        newState[sales[i].id] = {
          ...sales[i],
        }
      }
     
      return  newState;
    }
    
    default: {
      return state;
    }
  }
}



const order = (state=[], action) => {
  switch (action.type) {
    case types.SALES_FETCHED_SUCCEDDED: {
      const {
        payload: {
          sales,
        },
      } = action;
      const newState = Object.values(sales).map((alert) => alert.id);
      return newState;
    }
    default: {
      return state;
    }
  }
}

export default combineReducers({
  Sale,
  byId,
  order
})

//selectores
export const getSale = (state, id) => state.byId[id] || undefined; 
export const getAllSale = (state) => state.order.map((id) => getSale(state, id))
export const getLoading = (state) => state.Sale.loading