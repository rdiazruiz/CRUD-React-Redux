import {
  ADD_PRODUCT,
  ADD_PRODUCT_SUCCES,
  ADD_PRODUCT_ERROR,
  DOWNLOAD_PRODUCTS,
  DOWNLOAD_PRODUCTS_SUCCES,
  DOWNLOAD_PRODUCTS_ERROR,
  DELETE_PRODUCT,
  DELETE_PRODUCT_SUCCES,
  DELETE_PRODUCT_ERROR,
  EDIT_PRODUCT,
  EDIT_PRODUCT_SUCCES,
  EDIT_PRODUCT_ERROR
} from '../types';

//Cada reducer tiene su propio state
const initialState = {
  products: [],
  error: null,
  loading: false,
  deleteProduct: null,
  proudctEdit: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case DOWNLOAD_PRODUCTS:
    case ADD_PRODUCT:
      return {
        ...state,
        loading: action.payload
      };
    case ADD_PRODUCT_SUCCES:
      return {
        ...state,
        loading: false,
        products: [...state.products, action.payload]
      };
    case ADD_PRODUCT_ERROR:
    case DOWNLOAD_PRODUCTS_ERROR:
    case DELETE_PRODUCT_ERROR:
    case EDIT_PRODUCT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case DOWNLOAD_PRODUCTS_SUCCES:
      return {
        ...state,
        loading: false,
        error: null,
        products: action.payload
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        deleteProduct: action.payload
      };
    case DELETE_PRODUCT_SUCCES:
      return {
        ...state,
        products: state.products.filter(product => product.id !== state.deleteProduct),
        deleteProduct: null
      };
    case EDIT_PRODUCT:
      return {
        ...state,
        proudctEdit: action.payload
      };
    case EDIT_PRODUCT_SUCCES:
      return {
        ...state,
        proudctEdit: null,
        products: state.products.map(product =>
          product.id === action.payload.id ? (product = action.payload) : product
        )
      };
    default:
      return state;
  }
}
