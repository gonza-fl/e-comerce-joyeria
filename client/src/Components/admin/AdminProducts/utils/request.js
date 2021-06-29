/* eslint-disable no-prototype-builtins */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import swal from 'sweetalert';
import { URL_CATEGORIES, URL_PRODUCTS } from '../../../../constants';

export function updateProduct(product, id) {
  axios.put(`${URL_PRODUCTS}${product.id}`, product, {
    headers: {
      'access-token': id,
    },
  })
    .then(() => swal('Success', 'Producto modificado!'))
    .then(() => { window.location.href = '/admin/products'; })
    .catch((err) => {
      swal('Error', err.response.data, 'warning');
    });
}

export function createProduct(product, setLoading, id) {
  axios.post(URL_PRODUCTS, product, {
    headers: {
      'access-token': id,
    },
  })
    .then((res) => {
      if (res.data.hasOwnProperty('err')) {
        setLoading(false);
        swal('error', 'No se pudo crear al producto', 'warning');
      } else {
        setLoading(false);
        swal('¡Genial!', '¡Se creó el producto con éxito!', 'success')
          .then(() => { window.location.href = '/admin/products'; });
      }
    })
    .catch((err) => {
      setLoading(false);
      swal('Error', err.response.data, 'warning');
    });
}

export function deleteProduct(product, id) {
  swal({
    title: '¿Estás seguro que deseas eliminar este producto?',
    text: '',
    icon: 'warning',
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      axios.delete(`${URL_PRODUCTS}${product.id}`, product, {
        headers: {
          'access-token': id,
        },
      })
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
        .catch((err) => {
          swal('Error', err.response.data);
        });
    } else {
      swal('¡El producto no se eliminó!');
    }
  });
}

export function deleteCategory(category, id) {
  swal({
    title: '¿Estás seguro que deseas eliminar esta categoría?',
    text: '',
    icon: 'warning',
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      axios.delete(`${URL_CATEGORIES}${category.id}`, {
        headers: {
          'access-token': id,
        },
      }, category)
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
        .catch((err) => {
          console.log(err);
          swal('Error', 'mi error');
        });
    } else {
      swal('¡La categoría no se eliminó!');
    }
  });
}
