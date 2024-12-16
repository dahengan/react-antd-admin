import React, { useEffect, useState } from 'react'
import { Layout, Menu } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router'
import { SET_TAGLIST } from '@/store/modules/tagsView'
import { getRouteDetail } from '@/utils/index'
import './index.scss'

export default function Sider() {

  const dispatch = useDispatch()

  const routePathStr = useLocation().pathname

  const routePathArr = useLocation().pathname.split('/')

  const { Sider } = Layout

  const [stateOpenKeys, setStateOpenKeys] = useState([])

  const [selectedKeys, setSelectedKeys] = useState([])

  const navigate = useNavigate()

  const menus = useSelector((state) => {
    return state.permission.menuList
  })

  const sidebarOpened = useSelector((state) => {
    return state.app.sidebarOpened
  })

  const onOpenChange = openKeys => {
    setStateOpenKeys(openKeys)
  }

  const onClick = (e) => {
    navigate(e.key, { replace: true })
    setSelectedKeys([e.key])
    // getRouteDetail(e.key)
    dispatch(SET_TAGLIST({
      path: e.key,
      name: e.item.props.meta.title,
      meta: e.item.props.meta
    }))
  }

  useEffect(() => {
    let openKeysStr = ''
    let openKeysArr = []
    for (let i = 1; i < routePathArr.length - 1; i++) {
      openKeysStr = `${openKeysStr}/${routePathArr[i]}`
      openKeysArr.push(openKeysStr)
    }
    setStateOpenKeys(openKeysArr)
    setSelectedKeys([routePathStr])
  }, [])

  return (
    <Sider className='Layout_Sider' trigger={null} collapsible collapsed={sidebarOpened} >
      <Menu
        onClick={onClick}
        mode="inline"
        items={menus}
        openKeys={stateOpenKeys}
        selectedKeys={selectedKeys}
        onOpenChange={onOpenChange}
      />
    </Sider>
  )
}
