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
    case types.SALES_FETCHED_FAILED: {
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
        newState[i] = {
          ...sales[i],
          venta_neta: parseFloat(sales[i].venta_neta.toFixed( 2 )),
          cantidad_unidad: parseFloat(sales[i].cantidad_unidad.toFixed( 2 )),
        }
      }
      return  newState;
    }
    case types.SALES_FETCHED_FAILED: {
      return {}
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
      const newState = Object.values(sales).map((sale,idx) => idx);
      return newState;
    }
    default: {
      return state;
    }
  }
}

const defaultForecast = {
  loading: false,
  data: null,
}
const forecast = (state=defaultForecast, action) => {
  switch(action.type){
    case types.SALES_FORECAST_FETCHED: {
      return {
        ...state,
        loading: true
      }
    }
    case types.SALES_FORECAST_FETCHED_SUCCEDDED: {
      const {
        forecast
      } = action.payload;
      /*const dayData = [
        {
          venta_neta: 0,
          cantidad_unidad: 0,
        },
        {
          venta_neta: 0,
          cantidad_unidad: 0,
        },
        {
          venta_neta: 0,
          cantidad_unidad: 0,
        },
        {
          venta_neta: 0,
          cantidad_unidad: 0,
        },
        {
          venta_neta: 0,
          cantidad_unidad: 0,
        },
        {
          venta_neta: 0,
          cantidad_unidad: 0,
        },
        {
          venta_neta: 0,
          cantidad_unidad: 0,
        }
      ]
      forecast.map((y) => {
        const weekData = y.data;
        for(var i = 0; i < 7; i++){
          const dayIdx = i+1;
          const val = weekData.find(d => d.day === dayIdx);
          dayData[i].venta_neta += val ? val.venta_neta : 0;
          dayData[i].cantidad_unidad += val ? val.cantidad_unidad : 0;
        }
        return y;
      })
      const data_length = dayData.length;
      const avg_data = dayData.map(info => {
        return {
          cantidad_unidad: parseFloat((info.cantidad_unidad/data_length).toFixed(2)),
          venta_neta: parseFloat((info.venta_neta/data_length).toFixed(2)),
        }
      })*/
      return {
        ...state,
        loading: false,
        data: forecast
      }
    }
    case types.SALES_FORECAST_FETCHED_FAILED: {
      return {
        ...state,
        loading: false,
        data: null,
      }
    }
    default: {
      return {
        ...state
      }
    }
  }
}

export default combineReducers({
  Sale,
  byId,
  order,
  forecast
});

//selectores
export const getSale = (state, id) => state.byId[id] || undefined; 
export const getAllSale = (state) => state.order.map((id) => getSale(state, id));
export const getLoading = (state) => state.Sale.loading;
export const getForecastData = (state) => state.forecast.data;
export const getForecastLoading = (state) => state.forecast.loading;