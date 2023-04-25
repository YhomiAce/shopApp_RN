import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import ProductReducer from "./reducers/products";
import CartReducer from "./reducers/cart";
import OrderReducer from './reducers/orders';
import AuthReducer from './reducers/auth';
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  products: ProductReducer,
  carts: CartReducer,
  orders: OrderReducer,
  auth: AuthReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
