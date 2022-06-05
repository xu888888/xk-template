/*
 * @Author: 徐凯
 * @Date: 2022-06-04 16:37:39
 * @LastEditors: 徐凯
 * @LastEditTime: 2022-06-05 09:27:28
 * @FilePath: \react\test\src\api\home.js
 */

import { Get, Post } from '@utils/ajax';

class Api {
  @Post({ url: '/v2/easy/inv/client/api/trade/FrontPageService/lockOrderDetailPage.json' })
  send;

  @Get({ url: '/soso/fcgi-bin/client_search_cp' })
  getName;
}

export default new Api();
