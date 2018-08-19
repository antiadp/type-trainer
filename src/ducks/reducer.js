const initialState = {
    results: [],
    user: {}
}

export default function reducer(state=initialState, action){
    switch(action.type){
        case GET_TEST_RESULTS:
            return Object.assign({}, state, {results: action.payload})
        case GET_USER:
            console.log('newly created user reducer', action.payload)
            return Object.assign({}, state, {user: action.payload})
        case REMOVE_USER:
            return initialState;
        default: return state;
    }
}

const GET_TEST_RESULTS = 'GET_TEST_RESULTS';
const GET_USER = "GET_USER";
const REMOVE_USER = "REMOVE_USER";

export const getTestResults = (testResults) =>{
    return {
        type: GET_TEST_RESULTS,
        payload: testResults
    }
}
export const getUser = (user) => {
    return {
        type: GET_USER,
        payload: user
    }
}
export const removeUser = () => {
    return {
        type: REMOVE_USER
    }
}