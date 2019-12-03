import ip from 'icepick';
import {
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAILURE,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  RESET_PRODUCT
} from '../action_types';

const initialState = ip.freeze({
  products: {
    apiStatus: null,
    apiError: null,
    data: null,
  },
  addProduct: {
    apiStatus: null,
    apiError: null,
    data: null,
  },
  deleteProduct: {
    apiStatus: null,
    apiError: null,
    data: null,
  },
  activeProducts: [
    {id: 3, quantity: 2},
    {id: 6, quantity: 1},
    {id: 2, quantity: 1},
    {id: 1, quantity: 1},
    {id: 8, quantity: 3},
    {id: 10, quantity: 1},
  ]
});

export default function (state = initialState, action) {
  switch (action.type) {

    case GET_PRODUCT_REQUEST: {
      state = ip.setIn(state, ['products', 'apiStatus'], 'started');
      state = ip.setIn(state, ['products', 'apiError'], null);
      return state;
    }

    case GET_PRODUCT_SUCCESS: {
      state = ip.setIn(state, ['products', 'apiStatus'], 'success');
      state = ip.setIn(state, ['products', 'apiError'], null);
      state = ip.setIn(state, ['products', 'data'], action.payload);
      return state;
    }

    case GET_PRODUCT_FAILURE: {
      state = ip.setIn(state, ['products', 'apiStatus'], 'failure');
      state = ip.setIn(state, ['products', 'apiError'], action.payload);
      return state;
    }

    case ADD_PRODUCT_REQUEST: {
      state = ip.setIn(state, ['addProduct', 'apiStatus'], 'started');
      state = ip.setIn(state, ['addProduct', 'apiError'], null);
      return state;
    }

    case ADD_PRODUCT_SUCCESS: {
      state = ip.setIn(state, ['addProduct', 'apiStatus'], 'success');
      state = ip.setIn(state, ['addProduct', 'apiError'], null);
      state = ip.setIn(state, ['addProduct', 'data'], action.payload);
      let activeProducts = ip.thaw(state.activeProducts);
      const findIndex = activeProducts.findIndex(item => item.id === action.payload.id);
      if (findIndex !== -1) {
        activeProducts[findIndex].quantity += 1;
      } else {
        activeProducts.push({id: action.payload.id, quantity: 1});
      }
      state = ip.setIn(state, ['activeProducts'], activeProducts);
      return state;
    }

    case ADD_PRODUCT_FAILURE: {
      state = ip.setIn(state, ['addProduct', 'apiStatus'], 'failure');
      state = ip.setIn(state, ['addProduct', 'apiError'], action.payload);
      return state;
    }

    case DELETE_PRODUCT_REQUEST: {
      state = ip.setIn(state, ['deleteProduct', 'apiStatus'], 'started');
      state = ip.setIn(state, ['deleteProduct', 'apiError'], null);
      return state;
    }

    case DELETE_PRODUCT_SUCCESS: {
      state = ip.setIn(state, ['deleteProduct', 'apiStatus'], 'success');
      state = ip.setIn(state, ['deleteProduct', 'apiError'], null);
      state = ip.setIn(state, ['deleteProduct', 'data'], action.payload);
      let activeProducts = ip.thaw(state.activeProducts);
      const findIndex = activeProducts.findIndex(item => item.id === action.payload.id);
      if (findIndex !== -1) {
        if (activeProducts[findIndex].quantity <= 1) {
          activeProducts.splice(findIndex, 1);
        } else {
          activeProducts[findIndex].quantity -= 1;
        }
      }
      state = ip.setIn(state, ['activeProducts'], activeProducts);
      return state;
    }

    case DELETE_PRODUCT_FAILURE: {
      state = ip.setIn(state, ['deleteProduct', 'apiStatus'], 'failure');
      state = ip.setIn(state, ['deleteProduct', 'apiError'], action.payload);
      return state;
    }

    case RESET_PRODUCT: {
      state = ip.setIn(state, ['products'], initialState.products);
      return state;
    }

    default:
      return state;
  }
}
