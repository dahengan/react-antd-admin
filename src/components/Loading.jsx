import React, { useEffect } from "react";

import nprogress from "nprogress";
import "nprogress/nprogress.css";

export default function Loading() {

  //组件挂在时执行nprogress.start()
  useEffect(() => {
    nprogress.start()
  }, [])
  //组件消亡时执行 nprogress.done()
  useEffect(() => {
    return () => {
      nprogress.done()
    }
  })

  return (
    <React.Fragment />
  )
}
