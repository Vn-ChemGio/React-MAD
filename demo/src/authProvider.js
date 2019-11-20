import {AUTH_LOGIN, AUTH_LOGOUT, AUTH_CHECK, AUTH_ERROR} from 'react-admin';
/*
export default (type, params) => {
    if (type === AUTH_LOGIN) {
        const { username } = params;
      /!*  localStorage.setItem('username', username);*!/
        // accept all username/password combinations
        return Promise.reject('Unkown method');
    }
    if (type === AUTH_LOGOUT) {
        localStorage.removeItem('username');
        return Promise.resolve();
    }
    if (type === AUTH_ERROR) {
        return Promise.resolve();
    }
    if (type === AUTH_CHECK) {
        return localStorage.getItem('username')
            ? Promise.resolve()
            : Promise.reject();
    }
    return Promise.reject('Unkown method');
};*/

 const authProvider = {
    login: ({username, password}) => {
        const request = new Request('http://gmt.glwwzgfb.com:5400/api/login', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: new Headers({'Content-Type': 'application/json'}),
        });
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(({userId}) => {
                localStorage.setItem('token', userId);
            });
    },
    logout: params => Promise.resolve(),
    checkAuth: params => localStorage.getItem('token')
        ? Promise.resolve()
        : Promise.reject(),
    checkError: error => {
        const status = error.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem('token');
            return Promise.reject();
        }
        return Promise.resolve();
    },
    getPermissions: params => Promise.resolve(),
};

 export default authProvider;