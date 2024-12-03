import { configureStore, combineReducers } from '@reduxjs/toolkit'

// 持久化所需要的插件
import { persistStore, persistReducer } from 'redux-persist'

// 本地存储插件
import storage from 'redux-persist/lib/storage'

// 子模块reducers
import user from './modules/user.js'
import permission from './modules/permission.js'

// 创建reducer(合并拆分的reducer)
const rootReducer = combineReducers({
  user,
  permission
})

// 持久化配置
const persistConfig = {
  key: 'root', // 存储在 localStorage 中的键名
  storage, // // 使用 localStorage 作为存储介质
  whitelist: ['user'] // 需要持久化保存的模块，默认保存所有模块（语义：白名单）
  // blacklist: [], // 不需要持久化保存的模块，默认不保存任何模块（语义：黑名单）
}

// 创建持久化后的reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

// 创建store
const store = configureStore({
  reducer: persistedReducer,

  // 是否开启开发者工具，默认true
  devTools: true,

  // 配置中间件：如果使用redux-persist，则需要设置为false，否则控制台报错（非序列化数据）
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

// 创建持久化后的store
const persistor = persistStore(store)

// 导出store和持久化后的store
export { store, persistor }
