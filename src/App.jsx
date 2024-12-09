import { constantRoutes, transformRoutes } from '@/routers'
import { useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux'

import './App.scss'

function App() {

  const routes = useSelector(state => {
    return state.permission.routes
  })

  const pages = useRoutes(transformRoutes(routes))

  return (
    <div className="app app-wrapper">
      {pages}
    </div>
  );
}

export default App;
