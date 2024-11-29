import React from 'react'
import { useOutlet } from 'react-router-dom';

import './index.scss'

export default function Content() {

  const outlet = useOutlet();

  return (
    <div className='Layout_Content'>
      {outlet}
    </div>
  )
}
