/**
 * 封装 axios  发送的请求模板
 * 需求:
 * 1. promise 对象
 * 2.请求成功返回的就是 data 数据
 * 3.请求失败统一处理 error
 */
import axios from 'axios'
import {message} from 'antd'

export default function ajax(url,data,method='GET') {
  let promise = null
  method = method.toUpperCase()
  if(method === "GET"){
    promise = axios.get(url,{
      params:data
    })
  }else{
    promise = axios.post(url,data)
  }
  return promise
    .then((res) => {
      return res.data
    })
    .catch((err) => {
    message.error('网络异常,请刷新重试',2)
      console.log('***** 请求失败 *****')
      console.log(err)
      console.log('***** 请求失败 *****')
    })
}