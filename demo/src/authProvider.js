import axios from './common/axios'

export default {
    login: (props) => {
        return axios.post('/login', {
            ...props
        }).then(function ({userId, role, token}) {
            localStorage.setItem('userId', userId);
            localStorage.setItem('role', role);
            localStorage.setItem('token', token);

            return Promise.resolve()
        }).catch(function (error) {
            return Promise.reject()
           /* return Promise.reject(error.response.data.msg)*/
        });

    },
    logout: () => {
        localStorage.removeItem('username');
        return Promise.resolve();
    },
    checkError: () => Promise.resolve(),
    checkAuth: () =>
        localStorage.getItem('username') ? Promise.resolve() : Promise.reject(),
    getPermissions: () => Promise.reject('Unknown method'),
};
