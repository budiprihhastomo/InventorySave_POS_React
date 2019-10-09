import { combineReducers } from "redux";

import Product from "./Products";
import Carts from "./Carts";

const rootReducers = combineReducers({
  Product, Carts
});

export default rootReducers;
