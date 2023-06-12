import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import GuestLayout from './layouts/GuestLayout'
import LoginPage from './views/auth/Login';
import Page404 from './views/Page404';
import HomePage from './views/home/HomePage';
import MainLayout from './layouts/main/MainLayout';
import ProductDetailsPage from './views/productDetails/ProductDetailsPage';
import Cart from './views/cart/Cart'
import ShopNow from './views/shop/ShopNow'
import PaymentSuccess from './views/PaymentSuccess';
import Orders from './views/orders/Orders';
import ChatsScreen from './views/chat/ChatsScreen';
import DD from './views/DD';
// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { element: <Navigate to="/app" />, index: true },
        { path: 'app', element: <HomePage /> },
        { path: 'product/:id', element: <ProductDetailsPage /> },
        { path: 'category/:categoryId', element: <ShopNow /> },
        { path: 'cart', element: <Cart /> },
        { path: '/shop_now', element: <ShopNow /> },
        { path: '/payment_succsses', element: <PaymentSuccess /> },
        { path: '/orders', element: <Orders /> },
        { path: '/chats', element: <ChatsScreen /> },
        { path: '/dd', element: <DD /> },

        
        
      ],
    },
    {
      path: '/',
      element: <GuestLayout/>,
      children: [
        { path: '/guest', element: <HomePage /> },
        { path: 'login', element: <LoginPage/>},
      ]
    },
    
    {
      path: '*',
      element: <Page404 />,
    },
  ]);

  return routes;
}
