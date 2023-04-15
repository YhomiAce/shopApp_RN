import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform } from "react-native";
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import { NavigationContainer } from "@react-navigation/native";
import colors from "../constants/colors";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import DrawerNavigation from "./DrawerNavigation";
import EditProductScreen from "../screens/user/EditProductScreen";

const ShopStack = createNativeStackNavigator();

const ShopNavigation = () => {
  const defaultNavOptions = {
    headerStyle: {
      backgroundColor: Platform.OS === "android" ? colors.primary : "",
    },
    headerTintColor: Platform.OS === "android" ? "white" : colors.primary,
    headerTitleStyle: {
      fontFamily: "open-sans-bold",
    },
    headerBackTitleStyle: {
      fontFamily: "open-sans",
    },
  };
  return (
    <ShopStack.Navigator
      screenOptions={{
        ...defaultNavOptions,
      }}
    >
      <ShopStack.Screen
        name="Products"
        component={DrawerNavigation}
        options={{ headerShown: false }}
      />
      <ShopStack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={({ route }) => ({ title: route.params.title })}
      />
      <ShopStack.Screen name="Cart" component={CartScreen} />
      <ShopStack.Screen name="EditProduct" component={EditProductScreen} />
    </ShopStack.Navigator>
  );
};

export default ShopNavigation;
