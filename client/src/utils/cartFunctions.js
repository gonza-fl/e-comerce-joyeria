// import axios from 'axios';
// import { useSelector } from 'react-redux';
import swal from 'sweetalert';

export function addToCart(product) {
  // lo comentado aca arriba es lo que tendriamos que hacer
  // una vez funcione la ruta de carrito, cambiar url cart por la ruta correcta.
  // const user = useSelector((state) => state.user);
  const prodAmount = { ...product, amount: 1 };
  // const response = { id: user.id, products: [prodAmount] };
  // if(user.id.length > 1){axios.post(URL_CART/cart/, response )}
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
