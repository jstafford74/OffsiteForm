import {
    LOGIN,
    LOGOUT,
    GET_DATES,
    GET_PROFILE
} from "./actionTypes";

/**
 * 
 * Actions are payloads of information that send data from your application to your store.
 * They are the only source of information for the store.
 * @see {@link https://redux.js.org/basics/actions}
 */

// Fill in the properties that need to be returned
// in each action
export const onLogin = (tokens) => ({
    type: LOGIN,
    payload: {
        tokens

    }
});

export const onLogout = () => ({
    type: LOGOUT
});


export const onLoginData = (userData) => ({
    type: GET_PROFILE,
    payload: {
        userData
    }
});
