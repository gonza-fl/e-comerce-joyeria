/* eslint-disable no-prototype-builtins */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import swal from 'sweetalert';
import { URL_CATEGORIES, URL_PRODUCTS } from '../../../../constants';

export function sendChanges(product) {
  axios.put(`${URL_PRODUCTS}${product.id}`, product)
    .then((res) => {
      if (res.data.hasOwnProperty('err')) {
        return swal('Error', res.data.err, 'warning');
      }
      return swal('Success', 'Producto modificado!');
    })
    .catch(() => {
      swal('Error', 'Ocurrió un error. No se modificó el producto. Intente nuevamente');
    });
}

export function deleteProduct(product) {
  axios.delete(`${URL_PRODUCTS}${product.id}`, product)
    .then((res) => {
      if (res.data.hasOwnProperty('err')) {
        return swal('Error', res.data.err, 'warning');
      }
      return swal('Success', 'Producto eliminado con éxito!');
    })
    .catch(() => {
      swal('Error', 'Ocurrió un error. No se pudo eliminar el producto. Intente nuevamente');
    });
}

export function deleteCategory(category) {
  axios.delete(`${URL_CATEGORIES}${category.id}`, category)
    .then((res) => {
      if (res.data.hasOwnProperty('err')) {
        return swal('Error', res.data.err, 'warning');
      }
      return swal('Success', 'Producto eliminado con éxito!');
    })
    .catch(() => {
      swal('Error', 'Ocurrió un error. No se pudo eliminar el producto. Intente nuevamente');
    });
}
