import { legacy_createStore as createStore , combineReducers} from 'redux';
import ProductReducer from './reducers/products';

const rootReducer = combineReducers({
    products: ProductReducer
});

const store = createStore(rootReducer);

export default store;