/* eslint-disable no-prototype-builtins */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import swal from 'sweetalert';
import { URL_CATEGORIES, URL_PRODUCTS } from '../../../../constants';

export function updateProduct(product) {
  axios.put(`${URL_PRODUCTS}${product.id}`, product)
    .then(() => swal('Success', 'Producto modificado!'))
    .catch(() => {
      swal('Error', 'Ocurrió un error. No se modificó el producto. Intente nuevamente');
    });
}

export function createProduct(product, setLoading) {
  axios.post(URL_PRODUCTS, product)
    .then((res) => {
      if (res.data.hasOwnProperty('err')) {
        setLoading(false);
        swal('error', 'No se pudo crear al producto', 'warning');
      } else {
        setLoading(false);
        swal('Success', '¡Se creó el producto con éxito!')
          .then(() => { window.location.href = '/admin/products'; });
      }
    })
    .catch(() => {
      setLoading(false);
      swal('Error', 'Ocurrió un error. No se creó el product, intenta nuevamente');
    });
}

export function deleteProduct(product) {
  swal({
    title: '¿Estás seguro que deseas eliminar este producto?',
    text: '',
    icon: 'warning',
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      axios.delete(`${URL_PRODUCTS}${product.id}`, product)
        .then((res) => {
          if (res.data.hasOwnProperty('err')) {
            swal('Error', res.data.err, 'warning');
          } else {
            swal('¡El producto ha sido eliminada con éxito!', {
              icon: 'success',
            });
            window.location.href = '/admin/products';
          }
        })
        .catch(() => {
          swal('Error', 'Ocurrió un error. No se pudo eliminar el producto. Intente nuevamente');
        });
    } else {
      swal('¡El producto no se eliminó!');
    }
  });
}

export function deleteCategory(category) {
  swal({
    title: '¿Estás seguro que deseas eliminar esta categoría?',
    text: '',
    icon: 'warning',
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      axios.delete(`${URL_CATEGORIES}${category.id}`, category)
        .then((res) => {
          if (res.data.hasOwnProperty('err')) {
            swal('Error', res.data.err, 'warning');
          } else {
            swal('¡La categoría ha sido eliminada con éxito!', {
              icon: 'success',
            });
            window.location.href = '/admin/controlcategories';
          }
        })
        .catch(() => {
          swal('Error', 'Ocurrió un error. No se pudo eliminar la categoría. Intente nuevamente');
        });
    } else {
      swal('¡La categoría no se eliminó!');
    }
  });
}
