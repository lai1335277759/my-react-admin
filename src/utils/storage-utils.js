/**
 * 定义操作用户数据的方法
 */
const SUER_KEY = 'user'

//保存用户数据
export const setItem = (value) =>{
  if(!value || typeof value === 'function'){
    return console.log('用户数据保存失败',value)
  }
  localStorage.setItem(SUER_KEY,JSON.stringify(value))
}
//读取用户数据
export const getItem = () =>{
  const user = localStorage.getItem(SUER_KEY)
  if(!user)return ''
  return JSON.parse(user)
}
//删除用户数据
export const removeItem = () =>{
  localStorage.removeItem(SUER_KEY)
}