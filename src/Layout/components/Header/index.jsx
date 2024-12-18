import React, { useState, useEffect } from 'react'
import './index.scss'
import logo from '@/assets/img/logo.png'
import { DownOutlined } from '@ant-design/icons'
import { Dropdown, Space } from 'antd'
import { getPersonalInfo } from '@/api/user'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { resetTokenAsync } from '@/store/modules/user'


export default function Header() {

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const [userName, setUserName] = useState('user')

  const items = [
    // {
    //   key: '1',
    //   label: '1st menu item'
    // }, 
    {
      key: '2',
      label: '退出登录',
      onClick: (e) => {
        handleClick(e) // 
      }
    }
  ]

  async function geInfo() {
    try {
      const result = await getPersonalInfo()
      if (result.code === 1) {
        setUserName(result.data.userName)
      }
    } catch (error) {
      return error
    }
  }

  const handleClick = (e) => {
    if (e.key) {
      dispatch(resetTokenAsync()).then(() => {
        navigate('/login')
        location.reload()
      })
    }
  }

  useEffect(() => { geInfo() }, [])

  return (
    <div className='Layout_Header'>
      <div className='Layout_Header_left_box'>
        <img
          src={logo}
          alt=""
          className='Layout_Header_left_box_logo'
        />
        <div className='Layout_Header_left_box_tex'>后台管理平台</div>
      </div>

      <div className='Layout_Header_right_box'>
        <Dropdown menu={{ items }} placement="bottomRight">
          <Space>
            {userName}
            <DownOutlined />
          </Space>
        </Dropdown>
      </div>
    </div>
  )
}
