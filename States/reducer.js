export const GET_RAINFALL = 'database/rainfall/LOAD';
export const GET_RAINFALL_SUCCESS = 'database/rainfall/LOAD_SUCCESS';
export const GET_RAINFALL_FAIL = 'database/rainfall/LOAD_FAIL';
export const GET_RAINFALL_MONTHLY = 'database/rainfall-monthly/LOAD';
export const GET_RAINFALL_MONTHLY_SUCCESS = 'database/rainfall-monthly/LOAD_SUCCESS';
export const GET_RAINFALL_MONTHLY_FAIL = 'database/rainfall-monthly/LOAD_FAIL';
export const GET_RAINFALL_HOURLY = 'database/rainfall-hourly/LOAD';
export const GET_RAINFALL_HOURLY_SUCCESS = 'database/rainfall-hourly/LOAD_SUCCESS';
export const GET_RAINFALL_HOURLY_FAIL = 'database/rainfall-hourly/LOAD_FAIL';

export const GET_WATERLEVEL = 'database/waterlevel/LOAD';
export const GET_WATERLEVEL_SUCCESS = 'database/waterlevel/LOAD_SUCCESS';
export const GET_WATERLEVEL_FAIL = 'database/waterlevel/LOAD_FAIL';
export const GET_WATERLEVEL_MONTHLY = 'database/waterlevel-monthly/LOAD';
export const GET_WATERLEVEL_MONTHLY_SUCCESS = 'database/waterlevel-monthly/LOAD_SUCCESS';
export const GET_WATERLEVEL_MONTHLY_FAIL = 'database/waterlevel-monthly/LOAD_FAIL';
export const GET_WATERLEVEL_HOURLY = 'database/waterlevel-hourly/LOAD';
export const GET_WATERLEVEL_HOURLY_SUCCESS = 'database/waterlevel-hourly/LOAD_SUCCESS';
export const GET_WATERLEVEL_HOURLY_FAIL = 'database/waterlevel-hourly/LOAD_FAIL';

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
    case GET_RAINFALL_MONTHLY:
        return { 
            ...state,
            loading:true,
            failed:false
        }
    case GET_RAINFALL_MONTHLY_SUCCESS:
        return {
            ...state,
            loading:false,
            // todo: change this to the format in which the database responds
            rainfall:action.payload.data.data
        }
    case GET_RAINFALL_MONTHLY_FAIL:
        return {
            ...state,
            loading:false,
            failed:true
        }
    case GET_RAINFALL_HOURLY:
        return { 
            ...state,
            loading:true,
            failed:false
        }
    case GET_RAINFALL_HOURLY_SUCCESS:
        return {
            ...state,
            loading:false,
            // todo: change this to the format in which the database responds
            rainfall:action.payload.data.data
        }
    case GET_RAINFALL_HOURLY_FAIL:
        return {
            ...state,
            loading:false,
            failed:true
        }

    case GET_WATERLEVEL:
        return { 
            ...state,
            loading:true,
            failed:false
        }
    case GET_WATERLEVEL_SUCCESS:
        return {
            ...state,
            loading:false,
            // todo: change this to the format in which the database responds
            rainfall:action.payload.data.data
        }
    case GET_WATERLEVEL_FAIL:
        return {
            ...state,
            loading:false,
            failed:true
        }
    case GET_WATERLEVEL_MONTHLY:
        return { 
            ...state,
            loading:true,
            failed:false
        }
    case GET_WATERLEVEL_MONTHLY_SUCCESS:
        return {
            ...state,
            loading:false,
            // todo: change this to the format in which the database responds
            rainfall:action.payload.data.data
        }
    case GET_WATERLEVEL_MONTHLY_FAIL:
        return {
            ...state,
            loading:false,
            failed:true
        }
    case GET_WATERLEVEL_HOURLY:
        return { 
            ...state,
            loading:true,
            failed:false
        }
    case GET_WATERLEVEL_HOURLY_SUCCESS:
        return {
            ...state,
            loading:false,
            // todo: change this to the format in which the database responds
            rainfall:action.payload.data.data
        }
    case GET_WATERLEVEL_HOURLY_FAIL:
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

export function getRainFallMonthly(){
    return {
        type: GET_RAINFALL_MONTHLY,
        payload: {
            request:{
                method: 'GET',
                url: '/rainfall/monthly',
                data: {
                    number_of_units:4
                }
            }
        }
    }
}

export function getRainFallHourly(){
    return {
        type: GET_RAINFALL_HOURLY,
        payload: {
            request:{
                method: 'GET',
                url: '/rainfall/hourly',
                data: {
                    number_of_units:4
                }
            }
        }
    }
}

export function getWaterLevel(){
    return {
        type: GET_RAINFALL,
        payload: {
            request:{
                method: 'GET',
                url: '/waterlevel/daily',
                data: {
                    number_of_units:4
                }
            }
        }
    }
}

export function getWaterLevelMonthly(){
    return {
        type: GET_RAINFALL_MONTHLY,
        payload: {
            request:{
                method: 'GET',
                url: '/waterlevel/monthly',
                data: {
                    number_of_units:4
                }
            }
        }
    }
}

export function getWaterLevelHourly(){
    return {
        type: GET_RAINFALL_HOURLY,
        payload: {
            request:{
                method: 'GET',
                url: '/waterlevel/hourly',
                data: {
                    number_of_units:4
                }
            }
        }
    }
}