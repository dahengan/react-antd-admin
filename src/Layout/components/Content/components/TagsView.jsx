import React from 'react'
import './TagsView.scss'
import { Button } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux'
import { SET_SIDEBAROPENEND } from '@/store/modules/app'

export default function TagsView() {

  const dispatch = useDispatch()

  const sidebarOpened = useSelector((state) => {
    return state.app.sidebarOpened
  })

  function fnButton() {
    dispatch(SET_SIDEBAROPENEND(!sidebarOpened))
  }

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
    </div>
  )
}
