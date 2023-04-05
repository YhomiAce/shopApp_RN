import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import store from './src/store/store';
import ShopNavigation from './src/navigation/ShopNavigation';

export default function App() {
  return (
    <Provider store={store}>
    <ShopNavigation />
    </Provider>
  );
}

