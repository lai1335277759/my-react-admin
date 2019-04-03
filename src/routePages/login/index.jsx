import React, {Component} from 'react'
import {Form, Icon, Input, Button, message} from 'antd';


import {reqLogin} from '../../api'
import {setItem} from '../../utils/storage-utils'

import './login.less'
import logo from '../../assets/images/logo.png'

const Item = Form.Item

@Form.create()
class Login extends Component {
  //处理提交
  handleSubmit = (e) => {
    //禁止默认行为
    e.preventDefault()
    //校验用户名与密码是否正确
    this.props.form.validateFields(async (error, values) => {
      if (!error) {
        const {username, password} = values
        //发送登入请求
        const result = await reqLogin(username, password)
        if (result.status === 0) {
          message.success('登入成功')
          setItem(result.data)
          // 登入成功跳转到 Admin
          this.props.history.replace('/')
        }else {
          message.error(result.msg,2)
        }
      } else {
        console.log('***** 表单验证失败 *****')
        console.log(error)
        console.log('***** 表单验证失败 *****')
      }
    })
  }
  //自定义校验规则
  validator = (name) => {
    return (rule, value, callback) => {
      const length = value && value.length
      const userReg = /^\w+$/

      if (!value) {
        callback(`必须输入${name}`)
      } else if (length < 4) {
        callback(`${name}必须大于4位`)
      } else if (length > 15) {
        callback(`${name}必须小于15位`)
      } else if (!userReg.test(value)) {
        callback(`${name}由英文 数字或下划线组成`)
      } else {
        callback()
      }
    }
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo"/>
          <h1>React:后台管理项目</h1>
        </header>
        <section className="login-content">
          <h3>后台管理系统</h3>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Item>
              {getFieldDecorator('username', {
                rules: [
                  {validator: this.validator('用户名')}
                ],
              })(
                <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="请输入用户名"/>
              )}
            </Item>
            <Item>
              {getFieldDecorator('password', {
                rules: [{validator: this.validator('密码')}],
              })(
                <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                       placeholder="请输入密码"/>
              )}
            </Item>
            <Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Item>
          </Form>
        </section>
      </div>
    )
  }
}
export default Login