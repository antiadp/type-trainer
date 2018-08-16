const initialState = {
    results: []
}

export default function reducer(state=initialState, action){
    switch(action.type){
        case GET_TEST_RESULTS:
        console.log('action.payload',action.payload)
            return Object.assign({}, state, {results: action.payload})
        default: return state;
    }
}

const GET_TEST_RESULTS = 'GET_TEST_RESULTS';

export const getTestResults = (testResults) =>{
    return {
        type: GET_TEST_RESULTS,
        payload: testResults
    }
}