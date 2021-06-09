import {array} from "../Components/fakeDb"
import {filtrado} from "../Components/fakeDB-Categories";

export const TESTING = 'TESTING';
export const GET_PRODUCTOS = "GET_PRODUCTOS"


export function setTest(data) {
    return {type: TESTING, payload: data}
};


export function getProductos() {
    // aca va el axios.get al back end y el payload seria la ruta de get a los productos, mientrastanto traigo el array de constantes
    return {type: GET_PRODUCTOS, payload: array}
};

export function getProdutsByCategory(id){
    // Aca va el axios para traer categoria segun id
    return {type: GET_PRODUCTOS, payload:filtrado[id]}
}