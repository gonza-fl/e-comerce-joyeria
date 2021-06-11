import { TESTING, GET_PRODUCTS, GET_CATEGORIES, GET_PRODUCTS_BY_NAME, ADD_TO_CART } from '../actions/actions.js'

const InitialState = {
    test: 'This is a test. Write something and click on the button to modify this text',
    products:[],
    categories:[],
    productsByQuery: [],
    cart:[],
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
    if(action.type === ADD_TO_CART){
        return {
            ...state,
            cart: state.cart.concat(action.payload)
        }
    }

    return state;
}