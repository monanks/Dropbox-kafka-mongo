//import CryptoJS from 'crypto-js';
export const ADD_LOGIN_INFO = 'ADD_LOGIN_INFO';
export const ADD_SIGNUP_INFO = 'ADD_SIGNUP_INFO';
export const REMOVE_LOGIN_INFO = 'REMOVE_LOGIN_INFO';
export const REMOVE_SIGNUP_INFO = 'REMOVE_SIGNUP_INFO';
export const ADD_USER_INFO = 'ADD_USER_INFO';
export const REMOVE_USER_INFO = 'REMOVE_USER_INFO';
export const ADD_FILE_LIST = "ADD_FILE_LIST";
export const RESET_STATE = 'RESET_STATE';
export const CREATE_FOLDER = 'CREATE_FOLDER';
export const CLOSE_FOLDER = 'CLOSE_FOLDER';
export const CHANGE_CURDIR = 'CHANGE_CURDIR';
export const CHANGE_SHARED_CURDIR = 'CHANGE_SHARED_CURDIR';
export const CHANGE_USER_STATE = 'CHANGE_USER_STATE';
export const ADD_ACTIVITY_LIST = 'ADD_ACTIVITY_LIST';
export const ADD_SHARED_INFO = 'ADD_SHARED_INFO';
export const ADD_SHARED_FILE_LIST = "ADD_SHARED_FILE_LIST";

export function addSharedInfo(){
    return{
        type: ADD_SHARED_INFO,
    }
}

export function addActivityList(activitylist){
    return{
        type: ADD_ACTIVITY_LIST,
        activitylist
    }
}

export function changeUserState(pending,logged){
    return {
        type: CHANGE_USER_STATE,
        pending,
        logged
    }
}

export function changeCurdir(dir,curdir){
    return{
        type: CHANGE_CURDIR,
        dir,
        curdir 
    }
}

export function changeSharedCurdir(dir,curdir){
    return{
        type: CHANGE_SHARED_CURDIR,
        dir,
        curdir 
    }
}

export function closeFolder(){
    return {
        type: CLOSE_FOLDER
    }
}

export function createFolder(){
    return {
        type: CREATE_FOLDER
    }
}

export function addLoginInfo(email,password){
    //var h=CryptoJS.AES.encrypt(password,"key");
    //console.log(CryptoJS.AES.decrypt(h.toString()),"key");
    console.log(email+' '+password);
    return {
        type : ADD_LOGIN_INFO,
        email,
        password
    }
}

export function addSignupInfo(email,password,first,last){
    return {
        type : ADD_SIGNUP_INFO,
        email,
        password,
        first,
        last
    }
}

export function removeLoginInfo(){
    return {
        type : REMOVE_LOGIN_INFO
    }
}

export function removeSignupInfo(){
    return {
        type : REMOVE_SIGNUP_INFO
    }
}

export function addUserInfo(email,first,user_id,curdir,parentdir){
    return {
        type : ADD_USER_INFO,
        email,
        first,
        user_id,
        curdir,
        parentdir
    }
}

export function removeUserInfo(){
    return{
        type : REMOVE_USER_INFO
    }
}

export function addFileList(filelist){
    return{
        type: ADD_FILE_LIST,
        filelist
    }
}

export function addSharedFileList(filelist){
    return{
        type: ADD_SHARED_FILE_LIST,
        filelist
    }
}

export function resetState(){
    return{
        type: RESET_STATE
    }
}

