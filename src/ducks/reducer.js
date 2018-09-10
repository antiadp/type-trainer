const initialState = {
    results: [],
    user: {}
}



export default function reducer(state=initialState, action){
    switch(action.type){
        case GET_USER_RESULTS:
            return Object.assign({}, state, {results: action.payload})
        case GET_USER:
            return Object.assign({}, state, {user: action.payload})
        case REMOVE_USER:
            return initialState;
        default: return state;
    }
}

const GET_USER_RESULTS = 'GET_USER_RESULTS';
const GET_USER = "GET_USER";
const REMOVE_USER = "REMOVE_USER";

export const getUserResults = (userTestResults) =>{
    return {
        type: GET_USER_RESULTS,
        payload: userTestResults
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