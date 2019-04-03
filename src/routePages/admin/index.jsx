import React, {Component} from 'react'
import {Layout} from 'antd';
import {Route, Link ,Redirect,Switch} from 'react-router-dom'

import LeftNav from '../../components/left-nav'
import HeaderMain from '../../components/header-main'
import Home from '../home'
import Category from '../category'
import Product from '../product'
import User from '../user'
import Role from '../role'
import BarChart from '../bar-chart'
import LineChart from '../line-chart'
import PicChart from '../pic-chart'

import {getItem} from '../../utils/storage-utils'
import memory from '../../utils/memory-utils'

import './index.less'
import logo from '../../assets/images/logo.png'

const {
  Header, Content, Footer, Sider,
} = Layout;

export default class Admin extends Component {
  constructor(props) {
    super(props)
    //初始化
    this.state = {
      collapsed: false,
    }
    const user = getItem()
    if (!user || !user._id) {
      return this.props.history.replace('/login')
    }
    //将用户数据保存起来
    memory.user = user
  }


  onCollapse = (collapsed) => {
    this.setState({collapsed});
  }

  render() {
    return (
      <Layout style={{minHeight: '100vh'}}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <Link className="logo" to='/home'>
            <img src={logo} alt="logo"/>
            <h1>后台管理</h1>
          </Link>
          <LeftNav />
        </Sider>
        <Layout>
          <Header style={{background: '#fff', padding: 0, height:100}}>
            <HeaderMain />
          </Header>
          <Content style={{margin: '16px 16px'}}>
            <div style={{padding: 24, background: '#fff', minHeight: 360}}>
              <Switch>
                <Route path='/home' component={Home}/>
                <Route path='/category' component={Category}/>
                <Route path='/product' component={Product}/>
                <Route path='/role' component={Role}/>
                <Route path='/user' component={User}/>
                <Route path='/charts/line' component={LineChart}/>
                <Route path='/charts/bar' component={BarChart}/>
                <Route path='/charts/pie' component={PicChart}/>
                <Redirect to='/home'/>
              </Switch>

            </div>
          </Content>
          <Footer style={{textAlign: 'center'}}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}