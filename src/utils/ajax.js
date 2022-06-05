/*
 * @Author: 徐凯
 * @Date: 2022-06-04 14:17:07
 * @LastEditors: 青枫
 * @LastEditTime: 2022-06-05 21:10:03
 * @FilePath: \test\src\utils\ajax.js
 */
import React from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import { message, Spin } from 'antd';

const service = axios.create({
  timeout: 60000,
});

service.interceptors.request.use(
  (cfg) => {
    const { data } = cfg;
    if (!data) cfg.data = {};
    if (cfg.showLoading !== false) cfg.hideLoading = showLoading(Symbol('result'));

    return cfg;
  },
  (err) => {
    return Promise.reject(err);
  },
);

service.interceptors.response.use(
  (res) => {
    const { data, config } = res;
    if (config.hideLoading) config.hideLoading();
    if (res.data.success || res.data.code !== 0) {
      config.successMsg && message.success(config.successMsg);
      return data;
    } else {
      const msg =
        typeof config.errorMsg === 'string'
          ? config.errorMsg
          : data.message || data.msg || data.errorMessage || '系统错误！';
      if (config.errorMsg !== false) {
        message.error(msg);
      }
      return Promise.reject(data);
    }
  },
  (err) => {
    if (err && err.config && err.config.hideLoading) err.config.hideLoading();

    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '错误请求';
          break;
        case 401:
          err.message = '未授权，请重新登录';
          break;
        case 403:
          err.message = '拒绝访问';
          break;
        case 404:
          err.message = '请求错误,未找到该资源';
          break;
        case 405:
          err.message = '请求方法未允许';
          break;
        case 408:
          err.message = '请求超时';
          break;
        case 500:
          err.message = '服务器端出错';
          break;
        case 501:
          err.message = '网络未实现';
          break;
        case 502:
          err.message = '网络错误';
          break;
        case 503:
          err.message = '服务不可用';
          break;
        case 504:
          err.message = '网络超时';
          break;
        case 505:
          err.message = 'http版本不支持该请求';
          break;
        default:
          err.message = `连接错误${err.res.status}`;
          break;
      }
    } else {
      // 超时处理
      if (JSON.stringify(err).includes('timeout')) {
        message.error('服务器响应超时，请刷新当前页');
      }
      message.error('连接服务器失败');
    }

    message.error(err.message);
    return Promise.reject(err);
  },
);

const arr = [];

function show(List) {
  if (List.length) {
    const loadingContainer = document.createElement('div');
    loadingContainer.setAttribute('id', 'globalLoading');
    document.body.appendChild(loadingContainer);
    ReactDom.render(<Spin size="large" />, loadingContainer);
  } else {
    document.body.removeChild(document.getElementById('globalLoading'));
  }
}

function showLoading(Symbol) {
  arr.push(Symbol);
  show(arr);
  return () => {
    arr.splice(arr.indexOf(Symbol), 1);
    show(arr);
  };
}

function creatApiByMethod(method) {
  return function (cfg) {
    return function (target, name) {
      target.constructor.prototype[name] = async (data, successMsg, errorMsg) => {
        method = cfg.method || method;
        const { reqFormat, resFormat, ...other } = cfg;
        if (typeof reqFormat === 'function') data = reqFormat(data);
        const isObject = Object.prototype.toString.call(data) === '[Object Object]';
        let params;
        if (isObject) {
          const { onProgress, ...otherParams } = data;
          params = otherParams;
        } else {
          params = data;
        }

        const config = {
          ...other,
          method,
          onUploadProgress: data.onProgress,
          onDownloadProgress: data.onProgress,
          successMsg: successMsg === undefined ? cfg.successMsg : successMsg,
          errorMsg: errorMsg === undefined ? cfg.errorMsg : errorMsg,
        };
        if (method === 'get') {
          config.params = params;
        } else {
          config.data = params;
        }
        const res = await service(config);
        if (typeof resFormat === 'function') return reqFormat(res, data);
        return res;
      };
      return target;
    };
  };
}

export const Post = creatApiByMethod('post');
export const Get = creatApiByMethod('get');
export default creatApiByMethod();
