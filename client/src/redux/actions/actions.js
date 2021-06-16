/* eslint-disable func-names */
/* eslint linebreak-style: ["error", "windows"] */

import axios from 'axios';

import {
  URL_PRODUCTS,
  URL_CATEGORIES,
  URL_PRODUCTS_BY_CATEGORY,
  URL_PRODUCTS_BY_SEARCH,
} from '../../constants';

export const GET_PRODUCTS_BY_CATEGORY = 'GET_PRODUCTS_BY_CATEGORY';
export const GET_CATEGORY_ID = 'GET_CATEGORY_ID';
export const GET_PRODUCTS = 'GET_PRODUCTS';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_PRODUCTS_BY_NAME = 'GET_PRODUCTS_BY_NAME';
export const ADD_TO_CART = 'ADD_TO_CART';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const MODIFY_PRODUCT = 'MODIFY_PRODUCT';
export const GET_PRODUCT_DETAIL = 'GET_PRODUCT_DETAIL';
export const TAKE_FROM_CART = 'TAKE_FROM_CART';

export function getProducts() {
  return function (dispatch) {
    return axios.get(URL_PRODUCTS).then((response) => {
      dispatch({
        type: GET_PRODUCTS,
        payload: response.data,
      });
    })
      .catch((err) => { alert(err); });
  };
}

export function getProdutsByCategory(id) {
  return function (dispatch) {
    return axios.get(`${URL_PRODUCTS_BY_CATEGORY}${id}`).then((response) => {
      dispatch({
        type: GET_PRODUCTS_BY_CATEGORY,
        payload: response.data,
      });
    })
      .catch(() => {
        dispatch({
          type: GET_PRODUCTS_BY_CATEGORY,
          payload: [],
        });
      });
  };
}

export function getCategories() {
  return function (dispatch) {
    return axios.get(URL_CATEGORIES).then((response) => {
      dispatch({
        type: GET_CATEGORIES,
        payload: response.data,
      });
    })
      .catch((err) => { alert(err); });
  };
}

export function getProductsByName(name) {
  return function (dispatch) {
    return axios.get(`${URL_PRODUCTS_BY_SEARCH}${name}`)
      .then((response) => {
        dispatch({
          type: GET_PRODUCTS_BY_NAME,
          payload: response.data,
        });
      })
      .catch(() => {
        dispatch({
          type: GET_PRODUCTS_BY_NAME,
          payload: [],
        });
      });
  };
}

export function addToCart(product) {
  const prodAmount = { ...product, amount: 1 };
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
      sinJson2[indx].amount += 1;
      localStorage.setItem('cart', JSON.stringify(sinJson2));
    } else { localStorage.setItem('cart', JSON.stringify(sinJson.concat(prodAmount))); }
  } else {
    const arr = [];
    const array = arr.concat(prodAmount);
    localStorage.setItem('cart', JSON.stringify(array));
  }
  return {
    type: ADD_TO_CART,
    payload: product,
  };
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
  return {
    type: TAKE_FROM_CART,
    payload: product,
  };
}

export function getProductDetail(id) {
  return function (dispatch) {
    return axios.get(`${URL_PRODUCTS}${id}`)
      .then((response) => {
        dispatch({
          type: GET_PRODUCT_DETAIL,
          payload: response.data,
        });
      })
      .catch((err) => { alert(err); });
  };
}

export function getCategoryId(id) {
  return { type: GET_CATEGORY_ID, payload: id };
}

// export function deleteProduct(id){
// QUE ONDA ACA? HAY QUE CAMBIAR LA RUTAAAAA, USATE EL CONSTANTS ;)
// creo que habian quedado ambas rutas definidas y usadas en products, y no se necesita el estado
//     // axios.delete(`http://localhost:3001/api/product/:${id}`)
//     //const prods = axios.get("http://localhost:3001/api/product")
//     return {
//         type:DELETE_PRODUCT,
//     }
// }

// export function modifyProduct(id){
//     return {
//         type:MODIFY_PRODUCT,
//         payload: id,
//     }
// }
