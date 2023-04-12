import { legacy_createStore as createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import ProductReducer from "./reducers/products";
import CartReducer from "./reducers/cart";
import OrderReducer from './reducers/orders';

const rootReducer = combineReducers({
  products: ProductReducer,
  carts: CartReducer,
  orders: OrderReducer
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;
