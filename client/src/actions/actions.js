import {filtrado} from "../Components/fakeDB-Categories";
import {array, categories} from "../Components/fakeDb"
import axios from "axios";



export const TESTING = 'TESTING';
export const GET_PRODUCTS = "GET_PRODUCTS"
export const GET_CATEGORIES = "GET_CATEGORIES"
export const GET_PRODUCTS_BY_NAME = "GET_PRODUCTS_BY_NAME"
export const ADD_TO_CART = "ADD_TO_CART"
export const DELETE_PRODUCT = "DELETE_PRODUCT"
export const MODIFY_PRODUCT = "MODIFY_PRODUCT"

export function setTest(data) {
    return {type: TESTING, payload: data}
};


export function getProducts() {
   // const prods = await axios.get("http://localhost:3001/api/product")
    // aca va el axios.get al back end y el payload seria la ruta de get a los productos, mientrastanto traigo el array de constantes
        return function (dispatch) {
          return axios.get("http://localhost:3001/api/product").then((response) => {
            dispatch({
              type: GET_PRODUCTS,
              payload: response.data
            });
          })
          .catch((err) => {alert(err)});
        };
};

export function getProdutsByCategory(id){
    // Aca va el axios para traer categoria segun id
 return function (dispatch) {
          return axios.get(`http://localhost:3001/api/product/category/${id}`).then((response) => {
            dispatch({
              type: GET_PRODUCTS,
              payload: response.data
            });
          })
          .catch((err) => {alert(err)});
        };
};

export function getCategories(){
    // aca va el axios.get al back pidiendo las categorias.
return function(dispatch){
    return  axios.get(`http://localhost:3001/api/category`).then((response) => {
        dispatch({
          type: GET_CATEGORIES,
          payload: response.data
        });
      })
      .catch((err) => {alert(err)});
    };
}

export function getProductsByName(name){
    // aca va el axios.get que pide a la ruta que devuelve productos por query
    // axios.get(`http://localhost:3001/api/search?name=${query}`)
   
    return function (dispatch) {
    return  axios.get(`http://localhost:3001/api/search?name=${name}`).then((response) => {
        dispatch({
          type: GET_PRODUCTS_BY_NAME,
          payload: response.data
        });
      })
      .catch((err) => {alert(err)});
    }
}
export function addToCart(product){
    return {
        type:ADD_TO_CART,
        payload: product,
    }
}
// export function deleteProduct(id){
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