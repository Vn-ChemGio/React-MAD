import  axios from 'axios';
const instance = axios.create({
// .. where we make our configurations
    baseURL: 'http://gmt.glwwzgfb.com:5400/api'
});

// Where you would set stuff like your 'Authorization' header, etc ...
instance.defaults.headers.common['Content-Type'] = 'application/json';

// Also add/ configure interceptors && all the other cool stuff

if(localStorage.getItem('token'))
    instance.defaults.headers.common['tokenKey'] = localStorage.getItem('token');

export default instance;