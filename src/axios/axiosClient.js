import axios from 'axios';
import {REST_API_SERVER, PORT, BASE} from "@env"

const axiosClient = axios.create();

const url = `http://${REST_API_SERVER}:${PORT}/${BASE}`;
console.log("URL=",url)
axiosClient.defaults.baseURL = `http://${REST_API_SERVER}:${PORT}/${BASE}`;


axiosClient.defaults.headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
};

//All request will wait 2 seconds before timeout
axiosClient.defaults.timeout = 2000;

axiosClient.defaults.withCredentials = true;

export default axiosClient;