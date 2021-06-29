import axios from 'axios';
import swal from 'sweetalert';
import { URL_CART, URL_GET_CART } from '../constants';

export function addToCart(product, userId) {
  // lo comentado aca arriba es lo que tendriamos que hacer
  // una vez funcione la ruta de carrito, cambiar url cart por la ruta correcta.
  const prodAmount = { ...product, amount: 1 };
  const response = { id: userId, products: [prodAmount] };
  if (userId && userId.length > 1) {
    return axios.get(`${URL_GET_CART}${userId}/cart`).then((res) => {
      console.log(res.data);
      const productFound = res.data[0].products.find((prod) => prod.id === product.id);
      if (productFound && productFound.orderline.amount === product.amount) {
        return swal('Lo sentimos!', 'no hay stock suficiente de este producto para seguir sumando al carrito :(');
      }
      return axios.post(`${URL_CART}`, response);
    // }).catch((err) => swal('Lo sentimos!', err, 'warning'));
    }).catch((err) => console.log('error de mi ', err));
  }
  if (localStorage.getItem('cart')) {
    const sinJson = JSON.parse(localStorage.getItem('cart'));
    const equal = sinJson;
    const sinProductAmount = equal.map((p) => {
      const container = { ...p, amount: 1 }; return container;
    });
    //
    if (sinProductAmount.some((p) => p.id === prodAmount.id)) {
      const sinJson2 = sinJson;
      const posic = sinProductAmount.map((el) => el.id);
      const indx = posic.indexOf(prodAmount.id);
      if (sinJson[indx].stockAmount > sinJson[indx].amount) {
        sinJson2[indx].amount += 1;
        localStorage.setItem('cart', JSON.stringify(sinJson2));
      } else { swal('Lo sentimos!', 'no hay stock suficiente de este producto para seguir sumando al carrito :('); }
    } else { localStorage.setItem('cart', JSON.stringify(sinJson.concat(prodAmount))); }
  } else {
    const arr = [];
    const array = arr.concat(prodAmount);
    localStorage.setItem('cart', JSON.stringify(array));
  }
  return '';
}

export function takeFromCart(product) {
  const sinJson = JSON.parse(localStorage.getItem('cart'));
  const prodAmount = { ...product, amount: 1 };
  const equal = sinJson;
  const sinProductAmount = equal.map((p) => {
    const container = { ...p, amount: 1 }; return container;
  });
  const posic = sinProductAmount.map((el) => el.id);
  const indx = posic.indexOf(prodAmount.id);
  if (sinJson[indx].amount > 1) {
    sinJson[indx].aumount -= 1;
    localStorage.setItem('cart', JSON.stringify(sinJson));
  } else { localStorage.setItem('cart', JSON.stringify(sinJson.splice(indx, 1))); }
}
