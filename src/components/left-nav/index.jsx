import React, {Component} from 'react'
import {Menu, Icon} from 'antd';
import {Link, withRouter} from 'react-router-dom'

import MenuList from '../../config/menu-config'

const Item = Menu.Item
const SubMenu = Menu.SubMenu;
@withRouter
class LeftNav extends Component {
  constructor(props) {
    super(props)
    const openKys = []
    this.menus = this.createMenu(MenuList, openKys)
    this.state = {
      openKys
    }
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

  createMenu = (menuList, openKys) => {
    return menuList.map((menu) => {
      const {pathname} = this.props.location
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
                  openKys.push(menu.key)
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
  handleOpenChange = (openKys) => {
    this.setState({openKys})
  }

  render() {
    const {pathname} = this.props.location
    return (
      <Menu theme="dark" selectedKeys={[pathname]} mode="inline" openKeys={this.state.openKys}
            onOpenChange={this.handleOpenChange}>
        {this.menus}
      </Menu>
    )
  }
}
export default LeftNav