import {array, categories} from "../Components/fakeDb"

export const TESTING = 'TESTING';
export const GET_PRODUCTOS = "GET_PRODUCTOS"
export const GET_CATEGORIES = "GET_CATEGORIES"


export function setTest(data) {
    return {type: TESTING, payload: data}
};


export function getProductos() {
    // aca va el axios.get al back end y el payload seria la ruta de get a los productos, mientrastanto traigo el array de constantes
    return {type: GET_PRODUCTOS, payload: array}
};
export function getCategories(){
    // aca va el axios.get al back pidiendo las categorias.
    return {type: GET_CATEGORIES, payload: categories}
}
