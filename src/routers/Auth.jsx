import React from 'react'
import { getToken } from '@/utils/auth'
import { Navigate } from "react-router-dom";
import { getMenuAsync } from '@/store/modules/permission'
import { useDispatch, useSelector } from 'react-redux'
import { message } from 'antd'

export default function Auth(props) {
  const dispatch = useDispatch()
  const { meta, path } = props

  // 设置标题z
  if (meta && meta.title) {
    document.title = meta.title
  }


  // 确定用户是否已登录de
  const hasToken = getToken()

  // 已登录
  /*   if (hasToken) {
      // 已登录访问login页面，直接重定向道首页
      if (path === '/login') {
        return <Navigate to="/home" replace></Navigate>
      } else {
        // 获取动态路由
        const hasAsyncRoutes = useSelector((state) => { return state.permission.asyncRoutes })
  
        // 存在动态路由
        if (hasAsyncRoutes.length > 0) {
          return (
            <React.Fragment> {props.children} </React.Fragment>
          )
        } else {
          // 获取动态路由
          dispatch(getMenuAsync()).then(data => {
            console.log(data, 'getMenuAsync-dispatch');
          }).catch(() => {
            message.error('获取用户信息失败！')
            return <Navigate to="/login" replace></Navigate>
          })
        }
      }
    } else {
      // 未登录 
      return <Navigate to="/login" replace></Navigate>
    } */

  return (
    // <React.Fragment> {props.children} </React.Fragment>
    // <React.Fragment> <Navigate to="/home" replace></Navigate> </React.Fragment>
    <Navigate to="/login"></Navigate>
  )
}
