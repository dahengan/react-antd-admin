import Layout from '@/Layout/index'
import Empty from '@/Layout/Empty'
import { lazyLoad } from '@/utils/index'

export default {
  // 系统管理
  SystemManage: <Layout />,
  // 权限设置
  Permission: <Empty />,
  // 用户解锁界面
  UserUnlock: lazyLoad(() => import('@/views/SystemManage/Permission/UserUnlock'))
}
