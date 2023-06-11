import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from './layouts/dashboard';
import GuestLayout from './layouts/GuestLayout'
import LoginPage from './pages/auth/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/product/Products';
import DashboardAppPage from './pages/DashboardAppPage';
import NewProductPage from './pages/product/NewProductPage';
import NewCategoryPage from './pages/category/NewCategory';
import CategoriesPage from './pages/category/Categories';
import NewAttributeGroup from './pages/attributeGroup/NewAttributeGroup';
import EditProductPage from './pages/product/EditProductPage';
import ProfilePage from './pages/ProfilePage';
import UsersPage from './pages/users/Users';
import NewUserPage from './pages/users/NewUser';

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'new_product', element: <NewProductPage /> },
        { path: 'edit_product/:id', element: <EditProductPage /> },
        { path: 'profile/', element: <ProfilePage /> },
    
        { path: 'categories', element: <CategoriesPage /> },
        { path: 'new_category', element: <NewCategoryPage /> },
        
        { path: 'new_attribute_groups', element: <NewAttributeGroup /> },
        { path: 'products', element: <ProductsPage /> },

        { path: 'users', element: <UsersPage /> }
      ],
    },
    {
      path: '/',
      element: <GuestLayout/>,
      children: [
        {
          path: 'login',
          element: <LoginPage/>
        },
      ]
    },
    
    {
      path: '*',
      element: <Page404 />,
    },
  ]);

  return routes;
}
