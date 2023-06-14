
import axios from "axios";
import baseUrl from "../src/baseUrl";

const appUrl = baseUrl+'/api/v1/admin/';
const axiosClient = axios .create({
  baseURL: appUrl,
  headers: {
    'Accept': 'application/json',
  },
})

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('ACCESS_TOKEN');
  config.headers.Authorization = `Bearer ${token}`
  return config;
})

axiosClient.interceptors.response.use((response) => {
  return response
}, (error) => {
  const {response} = error;
  if (response.status === 401) {
    localStorage.removeItem('ACCESS_TOKEN')
  }

  throw error;
})

export default axiosClient
