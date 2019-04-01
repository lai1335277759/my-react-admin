import React, {Component} from 'react'
import {
  Form, Icon, Input, Button
} from 'antd';

import './login.less'
import logo from './logo.png'

const Item = Form.Item

@Form.create()
class Login extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((error,values) => {
      if(!error){
        console.log('提交成功')
      }else{
        console.log(error)
      }
    })
  }

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
              {getFieldDecorator('userName', {
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