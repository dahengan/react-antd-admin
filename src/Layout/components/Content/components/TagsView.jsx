import React, { useEffect } from 'react'
import { Button, Tag } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useLocation, useNavigate } from 'react-router'
import { SET_SIDEBAROPENEND } from '@/store/modules/app'
import { SET_TAGLIST, delTagListAsync } from '@/store/modules/tagsView'
import { constantRoutes } from '@/routers'
import { getRouteDetail } from '@/utils/index'
import './TagsView.scss'
import { CloseOutlined } from '@ant-design/icons';

export default function TagsView() {

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const routePathStr = useLocation()

  const sidebarOpened = useSelector((state) => {
    return state.app.sidebarOpened
  })

  const visitedViews = useSelector((state) => {
    return state.tagsView.tagList
  })

  const fnButton = () => {
    dispatch(SET_SIDEBAROPENEND(!sidebarOpened))
  }

  const filterAffixTags = route => {
    const hasChildren = route.children && route.children.length > 0

    if (route.meta && route.meta.affix) {
      dispatch(SET_TAGLIST({
        path: route.path,
        name: route.meta.title
      }))
    } else {
      if (hasChildren) {
        route.children.map(i => filterAffixTags(i))
      }
    }
  }

  const initTags = routes => {
    routes.forEach(route => {
      filterAffixTags(route)
    })
    dispatch(SET_TAGLIST({
      path: routePathStr.pathname,
      name: getRouteDetail(routePathStr.pathname)
    }))
  }

  const toLastView = (path) => {
    dispatch(delTagListAsync(path)).then(() => {
      console.log(visitedViews, 'visitedViews');
      const latestView = visitedViews.slice(-1)[0]
      if (latestView) {
        navigate(latestView.path)
      } else {
        navigate('/')
      }
    })
  }

  console.log(visitedViews, 'visitedViews');

  useEffect(() => {
    initTags(constantRoutes)
  }, [])

  return (
    <div className='TagsView'>
      <Button
        type="text"
        icon={sidebarOpened ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={fnButton}
        style={{
          fontSize: '16px',
          borderRadius: '0'
        }}
      />

      {
        visitedViews.map(item => {
          if (item.name === '首页') {
            return <NavLink key={item.path} to={item.path}>
              {({ isActive }) => (
                <Tag className={isActive ? "tags_view_item active" : "tags_view_item"}>
                  {item.name}
                </Tag>
              )}
            </NavLink>
          } else {
            return <NavLink key={item.path} to={item.path}>
              {({ isActive }) => (
                <Tag className={isActive ? "tags_view_item active" : "tags_view_item"} >
                  {item.name}

                  <CloseOutlined
                    className='icon_close'
                    onClick={() => toLastView(item.path)}
                  />
                </Tag>
              )}
            </NavLink>
          }

        })
      }
    </div>
  )
}
