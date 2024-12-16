import { useRoutes } from 'react-router-dom'
import { transformRoutes, addRoutes } from '@/routers'
import useGetMenu from '@/hook/useGetMenu'
import { getLocalStorage } from '@/utils/storage'
import './App.scss'

function App() {

  const initRoutesList = useGetMenu(getLocalStorage('initRoutesList')).initRoutesList

  const pages = useRoutes(transformRoutes(addRoutes(initRoutesList)))

  return (
    <div className="app app-wrapper">
      {pages}
    </div>
  );
}

export default App;
