import { TESTING, GET_PRODUCTOS } from '../actions/actions.js'

const InitialState = {
    test: 'This is a test. Write something and click on the button to modify this text',
    products:[],
}

export default function rootReducer(state = InitialState, action) {
    if(action.type === TESTING) {
        return {
            ...state,
            test: action.payload
        }
    }
    if(action.type === GET_PRODUCTOS){
        return {
            ...state,
            products: action.payload
        }
    }

    return state;
}