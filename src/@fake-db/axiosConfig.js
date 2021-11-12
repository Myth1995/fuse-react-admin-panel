// First we need to import axios.js
import axios from 'axios';
// Next we make an 'instance' of it
const instance = axios.create({
// .. where we make our configurations
    baseURL: 'http://localhost:8082/api/'
});

// Where you would set stuff like your 'Authorization' header, etc ...
instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

instance.defaults.timeout = 2500;

// Also add/ configure interceptors && all the other cool stuff

instance.defaults.headers.post['Content-Type'] = 'application/json';

export default instance;