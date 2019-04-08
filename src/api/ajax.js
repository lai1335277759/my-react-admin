/**
 * 封装 axios 请求
 * 返回 Promise对象
 * 统一处理错误
 */
import axios from 'axios'
import {message} from 'antd'

export default function ajax(url, data, method = 'GET') {
  method = method.toUpperCase() //转换成大写
  let promise
  if (method === 'GET') {
    promise = axios.get(url, {params: data})
  } else {
    promise = axios.post(url, data)
  }
  return promise
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      message.error('网络异常,请刷新重试', 2)
      console.log('***** 请求失败 *****')
      console.log(err)
      console.log('***** 请求失败 *****')
    })
}