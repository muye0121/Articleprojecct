import axios from "axios";
import config from "@/config.json";
import qs from "qs";
import { message } from "antd";
import useAppStore from "@/store/app-store";
import type { AxiosRequestTransformer,AxiosError} from "axios";
import { resetAllstore } from "@/store/resetters";
const instance = axios.create({
  baseURL: config.baseURL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "x-api-key": "ab428ee8-c6ae-4bee-86ca-a5bd3437cff5",
  },
});
//请求拦截器
instance.interceptors.request.use(
  function (config) {
    const url = config.url;
    const method = config.method?.toUpperCase();
//为config挂载请求转换器
    if (
      (url === "/my/article/add" && method === "POST") ||
      (url === "/my/article/info" && method === "PUT")
    ) {
      config.transformRequest = [];
    } else {
      config.transformRequest = requestTransformer;
    }
    config.paramsSerializer={
      serialize(params){
        if(params instanceof FormData){
          return qs.stringify(Object.fromEntries(params))
        }else{
          return qs.stringify(params)
        }
      }
    }
    const token=useAppStore.getState().token
    if(url?.includes('/my')&&token){
      config.headers.Authorization=token
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
//响应拦截器
instance.interceptors.response.use(function (response) {
    if(response.data){
        return response.data
    }else{
        return {code:1,message:response.statusText};
    }
  }, function (error:AxiosError<{code:number,message:string}>) {
    if(error.response&&error.response.data){
      if(error.response.status===401){
        useAppStore.getState().token&&message.error('登陆过期，请重新登录!')
        resetAllstore()
      }else{
        message.error(error.response.data.message)
      }
        return Promise.reject(error.response.data);
    }else{
        let meg=''
        switch(error.code){
            case 'ERR_NETWORK':
                meg='您的网络似乎断开了...'
                break;
            case'ECONNABORTED':
                meg='请求超时...'
                break;
            default:
                meg=error.message
        }
        message.error(meg);
        return Promise.reject({code:1,message:error.message});
    }
  });
const requestTransformer: AxiosRequestTransformer = (data) => {
  if (data instanceof FormData) {
    return qs.stringify(Object.fromEntries(data));
  } else {
    return qs.stringify(data);
  }
};
export default instance;
