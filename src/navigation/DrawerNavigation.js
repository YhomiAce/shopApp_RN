import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import OrderStackNavigator from "./OrderStack";
import colors from "../constants/colors";
import { Platform } from "react-native";
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import { Ionicons } from "@expo/vector-icons";
import UserProductsScreen from "../screens/user/UserProductsScreen";

const DrawerStack = createDrawerNavigator();

const DrawerNavigation = () => {
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
    <DrawerStack.Navigator screenOptions={{ ...defaultNavOptions }}>
      <DrawerStack.Screen
        name="All Products"
        component={ProductsOverviewScreen}
        options={{
          drawerIcon: ({ focused, size, color }) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
              size={size}
              color={focused ? colors.primary : color}
            />
          ),
        }}
      />
      <DrawerStack.Screen
        name="Orders"
        component={OrderStackNavigator}
        options={{
          drawerIcon: ({ focused, size, color }) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-list" : "ios-list"}
              size={size}
              color={focused ? colors.primary : color}
            />
          ),
        }}
      />
      <DrawerStack.Screen
        name="UserProducts"
        component={UserProductsScreen}
        options={{
          drawerIcon: ({ focused, size, color }) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-create" : "ios-create"}
              size={size}
              color={focused ? colors.primary : color}
            />
          ),
        }}
      />
    </DrawerStack.Navigator>
  );
};

export default DrawerNavigation;
