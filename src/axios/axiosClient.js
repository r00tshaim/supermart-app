import axios from 'axios';
import {REST_API_SERVER, PORT, BASE} from "@env"
import {store} from "../redux/store.js"

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


//axios interceptor - to add any headers before sending req
axiosClient.interceptors.request.use( async (request) => {
  const tokenInfo = store.getState().user.tokenInfo;
  //console.log(`interceptor tokenInfo=${tokenInfo}`)
  if(tokenInfo) {
    const token = tokenInfo.token;
    request.headers.Authorization =  `Bearer ${token}`;
  } 
  //console.log(`jwtInterceptor request header=${request.headers}`)
  return request;
}, (error) => {
  console.log(`error in axios interceptor error=${error}`)
  // Handle request errors here
  return Promise.reject(`Interceptor Error - ${error}`);
});

export default axiosClient;