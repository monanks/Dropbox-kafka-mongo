import { combineReducers } from 'redux';
import { composeResetReducer } from 'redux-reset-store';

import {
    ADD_LOGIN_INFO,
    ADD_SIGNUP_INFO,
    REMOVE_LOGIN_INFO,
    REMOVE_SIGNUP_INFO,
    ADD_USER_INFO,
    REMOVE_USER_INFO,
    ADD_FILE_LIST,
    CREATE_FOLDER,
    CLOSE_FOLDER,
    CHANGE_CURDIR,
    CHANGE_USER_STATE
} from '../actions/action';

function login(state={},action){
    switch(action.type){
        case ADD_LOGIN_INFO:
            return {...state,
                email: action.email,
                password: action.password
            }
        case REMOVE_LOGIN_INFO:
            return {}
        case 'persist/REHYDRATE':
            var incoming = action.payload.login;
            if(incoming) return incoming;
            return state;
        default:
            return state;
    }
}

function register(state={},action){
    switch(action.type){
        case ADD_SIGNUP_INFO:
            console.log(state);
            return {...state,
                email: action.email,
                password: action.password,
                firstname: action.first,
                lastname: action.last
            }
        case REMOVE_SIGNUP_INFO:
            return {}
        case 'persist/REHYDRATE':
            var incoming = action.payload.register;
            if(incoming) return incoming;
            return state;
        default:
            return state;
    }
}

function afterAuth(state={name:"",isLoggedin:false},action){
    switch(action.type){
        case ADD_USER_INFO:
            return {...state,
                email: action.email,
                name: action.first,
                userid: action.user_id,
                isLoggedin: true,
                curdir: action.curdir,
                parentdir: action.parentdir
            }
        case REMOVE_USER_INFO:
            return {
                name:"guest",
                isLoggedin: false
            }
        case CHANGE_CURDIR:
            return {...state,
                curdir: action.dir,
                parentdir: action.curdir
            }
        case 'persist/REHYDRATE':
            var incoming = action.payload.afterAuth;
            if(incoming) return incoming;
            return state;
        default:
            return state;
    }
}

function file(state={},action){
    switch(action.type){
        case ADD_FILE_LIST:
            return{
                list: action.filelist
            }
        case 'persist/REHYDRATE':
            var incoming = action.payload.file;
            if(incoming) return incoming;
            return state;
        default:
            return state;
    }
}

function folderstate(state=false,action){
    switch(action.type){
        case CREATE_FOLDER:
            return true;
        case CLOSE_FOLDER:
            return false;
        default:
            return state;
    }
}

function userstate(state={},action){
    switch(action.type){
        case CHANGE_USER_STATE:
            return {
                pending: action.pending,
                logged: action.logged
            }
        default:
            return state;
    }
}
const GreatReducer =  combineReducers({
    login,
    register,
    afterAuth,
    file,
    folderstate,
    userstate    
});        

const wholeReducer = composeResetReducer(GreatReducer,{});

export default wholeReducer;
