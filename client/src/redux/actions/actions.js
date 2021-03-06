/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable func-names */

import axios from 'axios';
import swal from 'sweetalert';

import {
  URL_PRODUCTS,
  URL_CATEGORIES,
  URL_PRODUCTS_BY_CATEGORY,
  URL_PRODUCTS_BY_SEARCH,
  URL_USERS,
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
export const SET_USER = 'SET_USER';
export const SHOW_FLOATING_CART = 'SHOW_FLOATING_CART';
export const GET_USER_ORDERS = 'GET_USER_ORDERS';
export const GET_USER_INFO = 'GET_USER_INFO';
export const GET_REVIEW_BY_USER = 'GET_REVIEW_BY_USER';
export const RESET_PRODUCT_DETAIL_AND_REVIEW = 'RESET_PRODUCT_DETAIL_AND_REVIEW';

export function getProducts() {
  return function (dispatch) {
    return axios.get(URL_PRODUCTS).then((response) => {
      dispatch({
        type: GET_PRODUCTS,
        payload: response.data,
      });
    })
      .catch((err) => { swal('Error', err.response.data, 'warning'); });
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
      .catch((err) => { swal('Error', err.response.data, 'warning'); });
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

export function getProductDetail(id) {
  return function (dispatch) {
    return axios.get(`${URL_PRODUCTS}${id}`)
      .then((response) => {
        dispatch({
          type: GET_PRODUCT_DETAIL,
          payload: response.data,
        });
      })
      .catch((err) => { swal('Error', err.response.data, 'warning'); });
  };
}

export function getCategoryId(id) {
  return { type: GET_CATEGORY_ID, payload: id };
}

export function setUser(user) {
  const actualUser = user ? { id: user.uid, email: user.email, name: user.displayName || 'Usuario' } : {};
  return { type: SET_USER, payload: actualUser };
}

export function getUserInfo(userId) {
  return function (dispatch) {
    return userId && axios.get(`${URL_USERS}${userId}`)
      .then((res) => {
        dispatch({
          type: GET_USER_INFO,
          payload: { ...res.data, name: res.data.displayName },
        });
      })
      .catch((err) => swal('Error', err.response.data, 'warning'));
  };
}

export function showFloatingCart(value) {
  return { type: SHOW_FLOATING_CART, payload: value };
}

export function getUserOrders(id) {
  return function (dispatch) {
    return (axios.get(`${URL_USERS}${id}/orders`)
      .then((response) => {
        dispatch({
          type: GET_USER_ORDERS,
          payload: response.data,
        });
      })
      .catch((err) => { swal('Error', err.response.data, 'warning'); })
    );
  };
}

export function restartProductsByCategory() {
  return { type: GET_PRODUCTS_BY_CATEGORY, payload: [] };
}

export function getReviewByUser(productId, userId) {
  return function (dispatch) {
    return (axios.get(`${URL_PRODUCTS}${productId}/review/${userId}`)
      .then((response) => {
        dispatch({
          type: GET_REVIEW_BY_USER,
          payload: response.data,
        });
      })
      .catch((err) => { swal('Error', err.response.data, 'warning'); })
    );
  };
}

export function resetProductDetailAndReview() {
  return { type: RESET_PRODUCT_DETAIL_AND_REVIEW };
}
