const MockAdapter = require('axios-mock-adapter');
const axios = require('axios');

// const instance = axios.create({
//     baseURL: 'http://localhost:8082/api/tutorials'
// });

// axios.defaults.baseURL = 'http://localhost:8082/api/tutorials';
// axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';


const mock = new MockAdapter(axios, { delayResponse: 500 });
export default mock;
