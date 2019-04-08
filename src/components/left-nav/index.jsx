import React, {Component} from 'react'
import {Menu, Icon,} from 'antd'
import {Link, withRouter} from 'react-router-dom'

import menuList from '../../config/menu-config'

const SubMenu = Menu.SubMenu;
const Item = Menu.Item
//修饰器
@withRouter
class LeftNav extends Component {
  constructor(props) {
    super(props)
    const openKeys = []
    this.state = {
      openKeys
    }
    this.menus = this.createMenu(menuList, openKeys)
  }

  createItem = (item) => {
    return (
      <Item key={item.key}>
        <Link to={item.key}>
          <Icon type={item.icon}/>
          <span>{item.title}</span>
        </Link>
      </Item>
    )
  }
  //创建菜单
  createMenu = (menuList, openKeys) => {
    const {pathname} = this.props.location
    return menuList.map((menu) => {
      const children = menu.children
      if (children) {
        //二级菜单
        return (
          <SubMenu
            key={menu.key}
            title={<span><Icon type={menu.icon}/><span>{menu.title}</span></span>}
          >
            {
              children.map((item) => {
                if (pathname === item.key) {
                  openKeys.push(menu.key)
                }
                return this.createItem(item)
              })
            }
          </SubMenu>
        )
      } else {
        //一级菜单
        return this.createItem(menu)
      }
    })
  }

  handleOpenChange = (openKeys) => {
    this.setState({openKeys})
  }
  //性能优化解决不必要的渲染
  shouldComponentUpdate(newProps, newState) {
    for (let key in newProps) {
      if (newProps[key] !== this.props[key]) {
        return true
      }
    }
    if (newState.openKeys !== this.state.openKeys) {
      return true
    }
    return false
  }

  render() {
    const {pathname} = this.props.location
    const {openKeys} = this.state
    return (
      <Menu theme="dark" selectedKeys={[pathname]} mode="inline" openKeys={openKeys}
            onOpenChange={this.handleOpenChange}>
        {this.menus}
      </Menu>
    )
  }
}
export default LeftNav