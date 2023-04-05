import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform } from "react-native";
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import { NavigationContainer } from "@react-navigation/native";
import colors from "../constants/colors";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";

const ShopStack = createNativeStackNavigator();

const ShopNavigation = () => {
  const defaultNavOptions = {
    headerStyle: {
      backgroundColor: Platform.OS === "android" ? colors.primary : "",
    },
    headerTintColor: Platform.OS === "android" ? "white" : colors.primary,
  };
  return (
    <NavigationContainer>
      <ShopStack.Navigator
        screenOptions={{
          ...defaultNavOptions,
        }}
      >
        <ShopStack.Screen
          name="ProductOverview"
          component={ProductsOverviewScreen}
          options={{ headerTitle: "All Products" }}
        />
        <ShopStack.Screen
          name="ProductDetail"
          component={ProductDetailScreen}
          options={({ route }) => ({ title: route.params.title })}
        />
      </ShopStack.Navigator>
    </NavigationContainer>
  );
};

export default ShopNavigation;
