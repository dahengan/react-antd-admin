import React from 'react'
import { Layout, Menu } from 'antd';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import './index.scss'

export default function Sider() {

  const { Sider } = Layout

  const navigate = useNavigate()

  const menus = useSelector((state) => {
    return state.permission.menuList
  })

  const sidebarOpened = useSelector((state) => {
    return state.app.sidebarOpened
  })

  const onClick = (e) => {
    console.log(e, 'e');

    navigate(e.key, { replace: true })
  }

  return (
    <Sider className='Layout_Sider' trigger={null} collapsible collapsed={sidebarOpened} >
      <Menu
        onClick={onClick}
        mode="inline"
        items={menus}
      />
    </Sider>
  )
}
