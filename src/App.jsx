import { constantRoutes, transformRoutes } from '@/routers'
import { useRoutes } from 'react-router-dom';

import './App.scss'

function App() {

  const pages = useRoutes(constantRoutes)

  // console.log(transformRoutes(constantRoutes), 'transformRoutes(constantRoutes)');


  return (
    <div className="app app-wrapper">
      {pages}
    </div>
  );
}

export default App;
