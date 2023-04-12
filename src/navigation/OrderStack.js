import { createNativeStackNavigator} from '@react-navigation/native-stack';
import OrdersScreen from '../screens/shop/OrdersScreen';

const OrderStack = createNativeStackNavigator();

const OrderStackNavigator = () => {
    return (
        <OrderStack.Navigator>
            <OrderStack.Screen name='Orders' component={OrdersScreen} options={{headerShown: false}} />
        </OrderStack.Navigator>
    )
}

export default OrderStackNavigator;