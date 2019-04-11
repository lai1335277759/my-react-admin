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
          console.log({weather, weatherImg: dayPictureUrl})
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
export const reqAddProducts = (product) => ajax(prefix + '/manage/product/add', product, 'POST')

//请求删除上传图片商品
export const reqRemoveUpload = (name, id) => ajax(prefix + '/manage/img/delete', {name, id}, 'POST')

//请求修改商品
export const reqUpdateProducts = (product) => ajax(prefix + '/manage/product/update', product, 'POST')

//请求搜索商品
export const reqSearch = (product) => ajax(prefix + '/manage/product/search', product)

//请求商品详情分类名
export const reqGetCategoryName = (categoryId) => ajax(prefix + '/manage/category/info', {categoryId})

//请求权限管理列表类名
export const reqGetRoleList = () => ajax(prefix + '/manage/role/list')

//请求添加角色
export const reqAddRole = (name) => ajax(prefix + '/manage/role/add',{name},'POST')

//请求修改角色权限
export const reqUpdateRole = (role) => ajax(prefix + '/manage/role/update',{role},'POST')

//请求获取用户列表
export const reqUserList = () => ajax(prefix + '/manage/user/list')

//请求创建用户
export const reqAddUser = (users) => ajax(prefix + '/manage/user/add',users,'POST')

//请求更新用户
export const reqUpdateUser = (users) => ajax(prefix + '/manage/user/update',users,'POST')

//请求删除用户
export const reqRemoveUser = (userId) => ajax(prefix + '/manage/user/delete',{userId},'POST')