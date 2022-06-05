/*
 * @Author: 徐凯
 * @Date: 2022-05-28 19:04:48
 * @LastEditors: 青枫
 * @LastEditTime: 2022-06-05 21:47:45
 * @FilePath: \xk-template\src\index.js
 */

import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { Button } from 'antd';
import { homeApi } from '@src/api';

const App = () => {
  function handleParams(str) {
    const obj = {};
    str.split('&').forEach((ele) => {
      const arr = ele.split('=');
      obj[arr[0]] = arr[1];
    });
    return obj;
  }

  const send = async () => {
    const str =
      '/splcloud/fcgi-bin/gethotkey.fcg?_=1654344513087&cv=4747474&ct=24&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=1&uin=1152921505200511798&g_tk_new_20200303=1095937439&g_tk=1095937439&hostUin=0';

    const params = handleParams(str);
    const res = await homeApi.getName(params, '成功了');

    console.log('wod', res);
  };

  return (
    <div>
      <h1>hello, word</h1>
      <Button type="primary" onClick={send}>
        发请求
      </Button>
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById('root'));
