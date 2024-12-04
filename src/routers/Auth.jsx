import React, { useEffect } from 'react'
import { getToken } from '@/utils/auth'
import { useNavigate, useLocation } from "react-router-dom";
import { getMenuAsync } from '@/store/modules/permission'
import { useDispatch, useSelector } from 'react-redux'
import { message } from 'antd'

export default function Auth(props) {
  const dispatch = useDispatch()

  const location = useLocation()

  const navigate = useNavigate()

  const { meta, path } = props

  // 确定用户是否已登录
  const hasToken = getToken()

  // 获取动态路由
  const hasAsyncRoutes = useSelector((state) => { return state.permission.asyncRoutes })

  // 设置标题z
  if (meta && meta.title) {
    document.title = meta.title
  }

  useEffect(() => {
    // 已登录
    if (hasToken) {
      // 已登录访问login页面，直接重定向道首页
      if (path === '/login') {
        navigate('/home')
      } else {
        // 判断是否存在动态路由
        if (hasAsyncRoutes.length === 0) {
          dispatch(getMenuAsync()).then(data => {
            navigate(location.pathname)
          }).catch(() => {
            message.error('获取用户信息失败！')
            navigate('/login')
          })
        }
      }
    } else {
      // 未登录 
      navigate('/login')
    }
  }, [])

  return (
    <React.Fragment> {props.children} </React.Fragment>
  )
}
