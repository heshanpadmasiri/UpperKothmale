export const GET_RAINFALL = 'database/rainfall/LOAD';
export const GET_RAINFALL_SUCCESS = 'database/rainfall/LOAD_SUCCESS';
export const GET_RAINFALL_FAIL = 'database/rainfall/LOAD_FAIL';

const initialState = {
    rainfall:[],
    stations:[],
    loading:false,
    failed:false
}

export default function reducer (state = initialState, action){
  switch (action.type) {
    case GET_RAINFALL:
        return { 
            ...state,
            loading:true,
            failed:false
        }
    case GET_RAINFALL_SUCCESS:
        return {
            ...state,
            loading:false,
            // todo: change this to the format in which the database responds
            rainfall:action.payload.data.data
        }
    case GET_RAINFALL_FAIL:
        return {
            ...state,
            loading:false,
            failed:true
        }
  default:
    return state
  }
}


export function getRainFall(){
    return {
        type: GET_RAINFALL,
        payload: {
            request:{
                method: 'GET',
                url: '/rainfall/daily',
                data: {
                    number_of_units:4
                }
            }
        }
    }
}