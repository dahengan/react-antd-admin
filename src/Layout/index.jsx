import React, { Fragment } from 'react'
import Header from './components/Header'
import Sider from './components/Sider'
import Content from './components/Content'
import './index.scss'

export default function Layout() {
  return (
    <Fragment>
      <Header />
      <div className='Layout_content'>
        <Sider />
        <Content />
      </div>
    </Fragment>
  )
}
