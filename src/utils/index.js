/*
 * @Author: 徐凯
 * @Date: 2022-06-04 14:16:43
 * @LastEditors: 徐凯
 * @LastEditTime: 2022-06-04 16:20:27
 * @FilePath: \react\test\utils\index.js
 */

export const strList = (str) => {
  if (str && typeof str === 'string') {
    return str.split(/,|，|\s+/).filter((i) => !!i);
  }
  return [];
};
