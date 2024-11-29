import React from 'react'
import './index.scss'
import logo from '@/assets/img/logo.png'

export default function Header() {
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
    </div>
  )
}
