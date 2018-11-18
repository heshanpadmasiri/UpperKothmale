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

export const GET_STATION_STATUS = 'database/station/LOAD';
export const GET_STATION_STATUS_SUCCESS = 'database/station/LOAD_SUCCESS';
export const GET_STATION_STATUS_FAIL = 'database/station/LOAD_FAIL';

export const GET_STATION_NAMES = 'database/station/names/LOAD';
export const GET_STATION_NAMES_SUCCESS = 'database/station/names/LOAD_SUCCESS';
export const GET_STATION_NAMES_FAIL = 'database/station/names/LOAD_FAIL';

export const CREATE_USER = 'database/user/CREATE';
export const CREATE_USER_SUCCESS = 'database/user/CREATE_SUCCESS';
export const CREATE_USER_FAIL = 'database/user/CREATE_FAIL';

export const LOGIN_USER = 'database/user/LOGIN';
export const LOGIN_USER_SUCCESS = 'database/user/LOGIN_SUCCESS';
export const LOGIN_USER_FAIL = 'database/user/LOGIN_FAIL';

export const AUTHENTICATED = 'internal/user/AUTHENTICATED'
export const REDIRECT = 'internal/nav/REDIRECT';
export const ENNABLE_REDIRECT = 'internal/nav/ENNABLE_REDIRECT';
export const REMEMBER = 'internal/user/REMEMBER';
export const FORGET = 'internal/user/FORGET';

const initialState = {
    loggedIn:false,
    authenticated:false,
    redirect:true,
    remember:false,
    userHash:"",
    rainfall:[],
    stations:[],
    stationStatus:[],
    stationNames:[],
    loading:false,
    failed:false,
    error:null,
    userCreated:false
}

export default function reducer (state = initialState, action){
    console.log(state,action)
  switch (action.type) {
    case GET_RAINFALL:
        return { 
            ...state,
            loading:true,
            failed:false
        }
    case GET_RAINFALL_SUCCESS:
        if(action.payload.data.sucess){
            return {
                ...state,
                loading:false,
                failed:false,
                // todo: change this to the format in which the database responds
                rainfall:action.payload.data.data
            }
        } else {
            return {
                ...state,
                loading:false,
                failed:true,
                error:action.payload.data.msg
            }
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
        if(action.payload.data.sucess){
            return {
                ...state,
                loading:false,
                failed:false,
                // todo: change this to the format in which the database responds
                rainfall:action.payload.data.data
            }
        } else {
            return {
                ...state,
                loading:false,
                failed:true,
                error:action.payload.data.msg
            }
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
        if(action.payload.data.sucess){
            return {
                ...state,
                loading:false,
                failed:false,
                // todo: change this to the format in which the database responds
                rainfall:action.payload.data.data
            }
        } else {
            return {
                ...state,
                loading:false,
                failed:true,
                error:action.payload.data.msg
            }
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
        if(action.payload.data.sucess){
            return {
                ...state,
                loading:false,
                failed:false,
                // todo: change this to the format in which the database responds
                rainfall:action.payload.data.data
            }
        } else {
            return {
                ...state,
                loading:false,
                failed:true,
                error:action.payload.data.msg
            }
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
        if(action.payload.data.sucess){
            return {
                ...state,
                loading:false,
                failed:false,
                // todo: change this to the format in which the database responds
                rainfall:action.payload.data.data
            }
        } else {
            return {
                ...state,
                loading:false,
                failed:true,
                error:action.payload.data.msg
            }
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
        if(action.payload.data.sucess){
            return {
                ...state,
                loading:false,
                failed:false,
                // todo: change this to the format in which the database responds
                rainfall:action.payload.data.data
            }
        } else {
            return {
                ...state,
                loading:false,
                failed:true,
                error:action.payload.data.msg
            }
        }
    case GET_WATERLEVEL_HOURLY_FAIL:
        return {
            ...state,
            loading:false,
            failed:true
        }
    case GET_STATION_STATUS:
        return {
            ...state,
            loading:true,
            failed:false
        }
    case GET_STATION_STATUS_SUCCESS:
        if(action.payload.data.sucess){
            return {
                ...state,
                loading:false,
                failed:false,
                // todo: change this to the format in which the database responds
                stationStatus:action.payload.data.data
            }
        } else {
            return {
                ...state,
                loading:false,
                failed:true,
                error:action.payload.data.msg
            }
        }        
    case GET_STATION_STATUS_FAIL:
        return {
            ...state,
            loading:false,
            failed:true
        }
    case GET_STATION_NAMES:
        return {
            ...state,
            loading:true,
            failed:false
        }
    case GET_STATION_NAMES_SUCCESS:
        if(action.payload.data.sucess){
            return {
                ...state,
                loading:false,
                failed:false,
                // todo: change this to the format in which the database responds
                stationNames:action.payload.data.data
            }
        } else {
            return {
                ...state,
                loading:false,
                failed:true,
                error:action.payload.data.msg
            }
        }        
    case GET_STATION_NAMES_FAIL:
        return {
            ...state,
            loading:false,
            failed:true
        }
    case CREATE_USER:
        return {
            ...state,
            loading:true,
            failed:false,
            userCreated:false
        }
    case CREATE_USER_SUCCESS:
        return {
            ...state,
            loading:false,
            userCreated:true
        }
    case CREATE_USER_FAIL:
        return {
            ...state,
            loading:false,
            failed:true,
            userCreated:false
        }
    case LOGIN_USER:
        return {
            ...state,
            loading:true,
            failed:false
        }
    case LOGIN_USER_SUCCESS:
        const password = action.payload.data.data.password
        const loggedIn = password != null;
        return{
            ...state,
            loading:false,
            userHash:password,
            loggedIn:loggedIn
        }    
    case LOGIN_USER_FAIL:
        return {
            ...state,
            loading:false,
            failed:true
        }
    case AUTHENTICATED:
        return {
            ...state,
            authenticated:true,
            redirect:true
        }
    case REDIRECT:
        return{
            ...state,
            redirect:false
        }   
    case REMEMBER:
        return {
            ...state,
            remember:true
        }
    case FORGET:
        return {
            ...state,
            remember:false
        }
    case ENNABLE_REDIRECT:
        return {
            ...state,
            redirect:true
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

export function authenticate(){
    return{
        type:AUTHENTICATED
    }
}

export function redirect(){
    return{
        type:REDIRECT
    }
}

export function remember(){
    return {
        type:REMEMBER
    }
}

export function forget(){
    return {
        type:FORGET
    }
}

export function ennableRedirect(){
    return {
        type:ENNABLE_REDIRECT
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

export function getStationStatus(){
    return {
        type: GET_STATION_STATUS,
        payload:{
            request:{
                method: 'GET',
                url: '/station/readings'
            }
        }
    }
}

export function getStationNames(){
    return {
        type: GET_STATION_NAMES,
        payload:{
            request:{
                method: 'GET',
                url: '/station/names'
            }
        }
    }
}

export function getUserHash(email){
    return {
        type: LOGIN_USER,
        payload:{
            request:{
                method:'GET',
                url:'/users/hash',
                params:{
                    email:email
                }
            }
        }
    }
}

export function createUser(firstName,middleName,surName,email,idNumber,station,designation,gender,password){
    return {
        type: CREATE_USER,
        payload:{
            request:{
                method:'POST',
                url: '/users/create-user',
                data:{
                    firstName:firstName,
                    middleName:middleName,
                    surName:surName,
                    email:email,
                    idNumber:idNumber,
                    station:station,
                    designation:designation,
                    gender:gender,
                    password:password
                }
            }
        }
    }
}