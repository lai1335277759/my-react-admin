/**
 * N个请求函数
 */
import ajax from './ajax'
import jsonp from 'jsonp'

const prefix = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'http://localhost:5000'

//登录请求
export const reqLogin = (username, password) => ajax(prefix + '/login', {username, password}, 'POST')

//请求获取天气
export const reqWeather = (city) => {
  return new Promise((resolve, reject) => {
    jsonp(`http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`,
      (err, data) => {
        if (!err) {
          const {dayPictureUrl, weather} = data.results[0].weather_data[0]
          resolve({weather, weatherImg: dayPictureUrl})
        } else {
          reject('网络异常,请求失败')
        }
      })
  })
}

//请求获取分类数据
export const reqGetCategory = (parentId) => ajax(prefix + '/manage/category/list', {parentId})

//添加分类
export const reqAddCategory = (parentId, categoryName) => ajax(prefix + '/manage/category/add', {
  parentId,
  categoryName
}, 'POST')

//修改分类名称
export const reqUpdateCategoryName = (categoryId, categoryName) => ajax(prefix + '/manage/category/update', {
  categoryId,
  categoryName
}, 'POST')

//请求商品分页数据
export const reqGetProducts = (pageNum, pageSize) => ajax(prefix + '/manage/product/list', {pageNum, pageSize})

//请求添加商品
export const reqSaveUpdateProducts = (categoryId, pCategoryId, name, price, desc) => {
  return ajax(prefix + '/manage/product/add', {categoryId, pCategoryId, name, price, desc}, 'POST')
}
