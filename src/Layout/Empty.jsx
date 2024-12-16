import React from 'react'
import { useOutlet } from 'react-router-dom'

export default function Empty() {
  const outlet = useOutlet()
  return (
    <React.Fragment> {outlet} </React.Fragment>
  )
}
