import { TESTING } from '../actions/actions.js'

const InitialState = {
    test: 'This is a test. Write something and click on the button to modify this text'
}

export default function rootReducer(state = InitialState, action) {
    if(action.type === TESTING) {
        return {
            ...state,
            test: action.payload
        }
    }

    return state;
}