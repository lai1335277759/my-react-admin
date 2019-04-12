import React, {Component} from 'react'
import {Menu, Icon,} from 'antd'
import {Link, withRouter} from 'react-router-dom'

import menuList from '../../config/menu-config'
import memory from '../../utils/memory-utils'

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
    const {menus} = memory.user.role
    let isFirst = true;
    return menuList.reduce((previous,current) => {
      if(menus.find((menu) => menu === current.key)){
        let children = current.children
        if(children){
          return [...previous,<SubMenu
            key={current.key}
            title={<span><Icon type={current.icon}/><span>{current.title}</span></span>}
          >
            {
              children.reduce((prev,curr) => {
                if(menus.find((item) => item === curr.key)){
                  if (pathname !== '/' && isFirst && (pathname.startsWith(curr.key)|| curr.key.startsWith(pathname))){
                    isFirst = false;
                    openKeys.push(current.key)
                  }
                  return [...prev,this.createItem(curr)]
                }else{
                  return prev
                }
              },[])
            }
          </SubMenu>]
        }else{
          return [...previous,this.createItem(current)]
        }
      }else{
        return previous
      }
    },[])
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
    let {pathname} = this.props.location
    const {openKeys} = this.state
    if(pathname.startsWith('/product')){
      pathname = '/product'
    }
    return (
      <Menu theme="dark" selectedKeys={[pathname]} mode="inline" openKeys={openKeys}
            onOpenChange={this.handleOpenChange}>
        {this.menus}
      </Menu>
    )
  }
}
export default LeftNav