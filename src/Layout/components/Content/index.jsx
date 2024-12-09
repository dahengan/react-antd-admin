import React from 'react'
import { useOutlet } from 'react-router-dom';
import TagsView from './components/TagsView'
import './index.scss'

export default function Content() {

  const outlet = useOutlet();

  return (
    <div className='Layout_Content'>
      <TagsView />

      <div className='app-main'>{outlet}</div>
    </div>
  )
}
