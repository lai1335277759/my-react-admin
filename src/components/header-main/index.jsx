import React, {Component} from 'react'
import {Modal, Row, Col, message} from 'antd'
import {withRouter} from 'react-router-dom'

import menuList from '../../config/menu-config'
import {reqWeather} from '../../api'
import {removeItem} from '../../utils/storage-utils'
import memory from '../../utils/memory-utils'
import UpdateTime from './updatetime'

import MyButton from '../my-button'
import './index.less'
@withRouter
class HeaderMain extends Component {
  state = {
    weather: '晴',
    weatherImg: 'http://api.map.baidu.com/images/weather/day/qing.png'
  }
  logout = () => {
    Modal.confirm({
      title: '您确定要退出?',
      onOk: () => {
        //清除localStorage 用户信息
        removeItem()
        memory.user = {}
        //跳转到登入页面
        this.props.history.replace('/login')
      },
      okText: '确定',
      cancelText: '取消',
    })
  }
  请求天气数据

  componentDidMount() {
    reqWeather('深圳')
      .then(res => {
        this.setState({
          weatherImg: res.weatherImg,
          weather: res.weather
        })
      })
      .catch(err => message.error(err, 2))
  }

  getTitle = () => {
    const {pathname} = this.props.location
    for (let i = 0, len = menuList.length; i < len; i++) {
      const menu = menuList[i]
      const children = menu.children
      if (children) {
        for (let j = 0, len = children.length; j < len; j++) {
          const item = children[j]
          if (pathname.startsWith(item.key)) {
            return item.title
          }
        }
      } else {
        if (pathname === menu.key) {
          return menu.title
        }
      }
    }
  }

  render() {
    //获取用户名
    const {username} = memory.user
    const {weather, weatherImg} = this.state
    //获取 title
    const title = this.getTitle()
    return (
      <div>
        <Row className='header-main-top'>
          <span>欢迎,{username}</span>&nbsp;&nbsp;
          <MyButton onClick={this.logout}>退出</MyButton>
        </Row>
        <Row className='header-main-bottom'>
          <Col className='header-main-left' span={5}>{title}</Col>
          <Col className='header-main-right' span={19}>
            <UpdateTime />
            <img src={weatherImg} alt="天气"/>
            <span>{weather}</span>
          </Col>
        </Row>
      </div>

    )
  }
}
export default HeaderMain