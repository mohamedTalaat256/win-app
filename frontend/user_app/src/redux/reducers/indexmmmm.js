import { combineReducers } from "redux";
import products from "./products";
import categories from "./categories";
import login from "./login";
import productReviews from "./productReviews";
import carts from "./carts";
import orders from "./orders";

export default combineReducers({
  login,
  products,
  categories,
  productReviews,
  carts,
  orders

});