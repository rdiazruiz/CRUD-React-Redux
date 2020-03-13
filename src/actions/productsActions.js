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
  EDIT_PRODUCT_START,
  EDIT_PRODUCT_SUCCES,
  EDIT_PRODUCT_ERROR
} from '../types';
import axiosClient from '../config/axios';
import Swal from 'sweetalert2';

// Crear nuevos productos
export function createNewProductAction(product) {
  return async dispatch => {
    dispatch(addProduct());

    try {
      //insertar en la API
      await axiosClient.post('/products', product);

      // si todo sale bien, actualizar el state
      dispatch(addProductSucces(product));

      // Alerta succes
      Swal.fire('Correcto', 'El producto se agrego correctamente', 'success');
    } catch (error) {
      console.log(error);
      // si hay un error cambiar el state
      dispatch(addProductError(true));

      // Alerta error
      Swal.fire({ icon: 'error', title: 'Hubo un error', text: 'Hubo un error, intenta de nuevo' });
    }
  };
}

const addProduct = () => ({
  type: ADD_PRODUCT,
  payload: true
});

// si el producto se guarda en la base de datos
const addProductSucces = product => ({
  type: ADD_PRODUCT_SUCCES,
  payload: product
});
// si hubo un error
const addProductError = state => ({
  type: ADD_PRODUCT_ERROR,
  payload: state
});

// Funcion que descarga los productos de la base de datos
export function getProductsAction() {
  return async dispatch => {
    dispatch(downloadProducts());

    try {
      const response = await axiosClient.get('/products');
      dispatch(downloadProductsSucces(response.data));
    } catch (error) {
      dispatch(downloadProductsError());
    }
  };
}

const downloadProducts = () => ({
  type: DOWNLOAD_PRODUCTS,
  payload: true
});

const downloadProductsSucces = products => ({
  type: DOWNLOAD_PRODUCTS_SUCCES,
  payload: products
});

const downloadProductsError = () => ({
  type: DOWNLOAD_PRODUCTS_ERROR,
  payload: true
});

// Selecciona y elimina el product
export function deleteProductAction(id) {
  return async dispatch => {
    dispatch(getDeleteProduct(id));

    try {
      await axiosClient.delete(`/products/${id}`);
      dispatch(deleteProductSucces());

      // Si se elimina, mostrar alerta
      Swal.fire('Eliminado!', 'El producto se eliminó correctamente', 'success');
    } catch (error) {
      dispatch(deleteProductError());
    }
  };
}

const getDeleteProduct = id => ({
  type: DELETE_PRODUCT,
  payload: id
});

const deleteProductSucces = () => ({
  type: DELETE_PRODUCT_SUCCES
});

const deleteProductError = () => ({
  type: DELETE_PRODUCT_ERROR,
  payload: true
});

// Colocar producto en edición
export function getProductEdit(product) {
  return dispatch => {
    dispatch(getProductEditAction(product));
  };
}

const getProductEditAction = product => ({
  type: EDIT_PRODUCT,
  payload: product
});

// Edita un registro en la api y state
export function editProductAction(product) {
  return async dispatch => {
    dispatch(editProduct());

    try {
      await axiosClient.put(`/products/${product.id}`, product);
      dispatch(editProductSucces(product));
    } catch (error) {
      console.log(error);
      dispatch(editProductError());
    }
  };
}

const editProduct = () => ({
  type: EDIT_PRODUCT_START
});

const editProductSucces = product => ({
  type: EDIT_PRODUCT_SUCCES,
  payload: product
});

const editProductError = () => ({
  type: EDIT_PRODUCT_ERROR,
  payload: true
});
