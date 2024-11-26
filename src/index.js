import React from 'react';
import ReactDOM from 'react-dom/client';
// 引入全局样式文件
import './styles/index.scss';
import App from './App';
 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
