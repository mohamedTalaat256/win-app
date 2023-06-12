import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import App from './App.js';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import ProductReduser from './redux/reducers/ProductReduser';
import CategoryReduser from './redux/reducers/CategoryReduser';
import AuthReduser from './redux/reducers/AuthReduser';
//import productReviews from './redux/reducers/ReviewReduser';
import CartReduser from './redux/reducers/CartReduser';
import OrderReduser from './redux/reducers/OrderReduser';
import review from './redux/reviewSlice';
import chat from './redux/chatSlice';
const store = configureStore({
    reducer: {
       products: ProductReduser,
       categories: CategoryReduser,
       login: AuthReduser,
       review,
       carts: CartReduser,
       orders: OrderReduser,
       chat
    }
});
ReactDOM.createRoot(document.getElementById("root")).render(

    <Provider store={store}>
        <App />
    </Provider>
);