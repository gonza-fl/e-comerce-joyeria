import { TESTING, GET_PRODUCTS, GET_CATEGORIES, GET_PRODUCTS_BY_NAME } from '../actions/actions.js'

const InitialState = {
    test: 'This is a test. Write something and click on the button to modify this text',
    products:[],
    categories:[],
    productsByQuery: []
}

export default function rootReducer(state = InitialState, action) {
    if(action.type === TESTING) {
        return {
            ...state,
            test: action.payload
        }
    }
    if(action.type === GET_PRODUCTS){
        return {
            ...state,
            products: action.payload
        }
    }
    if(action.type === GET_CATEGORIES){
        return {
            ...state,
            categories: action.payload
        }
    }

    if(action.type === GET_PRODUCTS_BY_NAME){
        return {
            ...state,
            productsByQuery: action.payload
        }
    }

    return state;
}