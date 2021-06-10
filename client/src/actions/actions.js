import {filtrado} from "../Components/fakeDB-Categories";
import {array, categories} from "../Components/fakeDb"

export const TESTING = 'TESTING';
export const GET_PRODUCTS = "GET_PRODUCTS"
export const GET_CATEGORIES = "GET_CATEGORIES"


export function setTest(data) {
    return {type: TESTING, payload: data}
};


export function getProducts() {
    // aca va el axios.get al back end y el payload seria la ruta de get a los productos, mientrastanto traigo el array de constantes
    return {type: GET_PRODUCTS, payload: array}
};

export function getProdutsByCategory(id){
    // Aca va el axios para traer categoria segun id
    return {type: GET_PRODUCTS, payload:filtrado[id]}
}
export function getCategories(){
    // aca va el axios.get al back pidiendo las categorias.
    return {type: GET_CATEGORIES, payload: categories}
}
