import React from 'react'
import store from 'redux/store'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const MerchantDashboard = React.lazy(() => import('./views/dashboard/MerchantDashboard'))
const UserList = React.lazy(() => import('./views/UserManagement/userList/UserList'))
const MerchantList = React.lazy(() => import('./views/UserManagement/merchantList/MerchantList'))
const AdminList = React.lazy(() => import('./views/UserManagement/adminList/AdminList'))
const MerchantStore = React.lazy(() => import('./views/MerchantStore/MerchantStore'))
const StoreList = React.lazy(() => import('./views/StoreList/StoreList'))
const StoreProduct = React.lazy(() => import('./views/storeProduct/StoreProduct'))
const AddProduct = React.lazy(() => import('./views/addProduct/AddProduct'))

const { auth: { data } } = store.getState();

const selectDashboard = () => {
  switch (data?.role) {
    case 'merchant':
      return MerchantDashboard
    case "admin":
      return Dashboard
    default:
      return null
  }
}

const routes = [
  { exact: true, path: `/dashboard`, name: 'Dashboard', component: selectDashboard(), role: ["admin", "merchant"] },
  {
    exact: true, path: '/dashboard/users', name: 'User List', component: UserList,
    role: ["admin"]
  },
  {
    exact: true, path: '/dashboard/merchants', name: 'Merchant List', component: MerchantList,
    role: ["admin"]
  },
  {
    exact: true, path: '/dashboard/admins', name: 'Admin List', component: AdminList,
    role: ["admin"]
  },
  {
    exact: true, path: '/dashboard/store', name: 'Stores', component: StoreList,
    role: ["admin"]
  },
  {
    exact: true, path: '/dashboard/:id/merchant', name: 'Store', component: MerchantStore,
    role: ["merchant"]
  },
  {
    exact: true, path: '/dashboard/store/:id/product', component: StoreProduct,
    role: ["merchant"]
  },
  {
    exact: true, path: '/dashboard/store/:id/add-product', component: AddProduct,
    role: ["merchant"]
  },
]

export default routes
