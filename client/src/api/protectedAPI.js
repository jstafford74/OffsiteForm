import axios from "axios";
import { Browser as JotBrowser } from 'jwt-jot'

import store from '../redux/store';
import { onLogout } from '../redux/actions';

export default {
    // Gets all books
    getDates: function () {
        return axiosP.get("/calendar");
    },
    // Gets the book with the given id
    getProfile: function () {
        return axiosP.get("/profile/");
    },
    // Deletes the book with the given id
    saveDate: function (id) {
        return axiosP.delete("/books/" + id);
    }
};

const axiosP = axios.create({
    baseURL: '/api/protected'
});

// https://www.npmjs.com/package/axios#interceptors
axiosP.interceptors.request.use(
    async function (config) {
        const source = axios.CancelToken.source();
        let authHeader;
        try {
            authHeader = await getAuthHeaderAsync();
        } catch (error) {
            store.dispatch(onLogout());
            source.cancel(`Request canceled: ${error}`);
            return { cancelToken: source.token };
        }

        config.headers = {
            ...config.headers,
            ...authHeader
        }

        return config;
    }
);

function getAuthHeaderAsync() {
    const accessJot = new JotBrowser('JWT_ACCESS');

    if (accessJot.getToken() && accessJot.valid()) return Promise.resolve(makeAuthHeader(accessJot));

    const refreshJot = new JotBrowser('JWT_REFRESH');

    if (!refreshJot.getToken()) return Promise.reject('Refresh token not found on client.');
    if (!refreshJot.valid()) return Promise.reject('Refresh token not valid on client.');

    return axios.post("/api/auth/refresh", { token: refreshJot.getToken() })
        .then(res => res.data)
        .then(data => {
            if (data.success) {
                // save new tokens in localstorage
                new JotBrowser('JWT_REFRESH', data.tokens.refresh);
                const accessJot = new JotBrowser('JWT_ACCESS', data.tokens.access);
                return makeAuthHeader(accessJot);
            } else {
                return Promise.reject(data.errors.token);
            }
        });
}

function makeAuthHeader(jot) {
    return { Authorization: 'Bearer ' + jot.getToken() };
}