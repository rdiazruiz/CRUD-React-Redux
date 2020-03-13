import React from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

// Redux
import { useDispatch } from 'react-redux';
import { deleteProductAction, getProductEdit } from '../actions/productsActions';

const Product = ({ product }) => {
  const { name, price, id } = product;

  const dispatch = useDispatch();
  const history = useHistory(); // Habilitar history para redireccion

  // Confirmar si desea eliminarlo
  const confirmDeleteProduct = id => {
    // preguntar al usuario
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'Un producto que se elimina no se puede recuperar',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.value) {
        // pasarlo al action
        dispatch(deleteProductAction(id));
      }
    });
  };

  // funcion que redirige de forma programada
  const redirectEdition = product => {
      dispatch(getProductEdit(product))
    history.push(`/products/edit/${product.id}`);
  };

  return (
    <tr>
      <td>{name}</td>
      <td>
        <span className="font-weight-bold">{price}€</span>
      </td>
      <td className="acciones">
        <button
          type="button"
          onClick={() => redirectEdition(product)}
          to={`/products/edit/${id}`}
          className="btn btn-primary mr-2"
        >
          Editar
        </button>
        <button type="button" className="btn btn-danger" onClick={() => confirmDeleteProduct(id)}>
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default Product;
