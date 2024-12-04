import axios from "axios";
import qs from "qs";

import { configType, getAcceptLanguageHeader, headers } from "./headers";
// import {headers} from "/src/services/http/headers";

const axiosApi = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  paramsSerializer: (params) => {
    return qs.stringify(params, { arrayFormat: "repeat" });
  }
});

axiosApi.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

axiosApi.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export async function get(url, config?) {
  return await axiosApi
    .get(url, {
      params: { ...config?.params },
      headers: { ...headers, ...getAcceptLanguageHeader(), ...config?.headers },
      withCredentials: true
    })
    .then((response) => response?.data);
}

export async function post(url, body?, config?) {
  return await axiosApi
    .post(url, body, {
      params: { ...config?.params },
      headers: {
        ...headers,
        ...configType,
        ...config?.headers
      },
      responseType: config?.responseType,
      withCredentials: true
    })
    .then((response) => response);
}

export async function update(url, body?, config?) {
  return await axiosApi
    .put(url, body, {
      params: { ...config?.params },
      headers: { ...headers, ...configType, ...config?.headers },
      withCredentials: true
    })
    .then((response) => response?.data);
}

export async function patch(url, body?, config?) {
  return await axiosApi
    .patch(url, body, {
      params: { ...config?.params },
      headers: { ...headers, ...config },
      withCredentials: true
    })
    .then((response) => response.data);
}

export async function remove(url, config?) {
  return await axiosApi
    .delete(url, {
      params: { ...config?.params },
      headers: { ...headers, ...config?.headers },
      withCredentials: true
    })
    .then((response) => response?.data);
}
