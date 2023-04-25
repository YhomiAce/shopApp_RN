import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthScreen from "../screens/user/AuthScreen";
import { Platform } from "react-native";
import colors from "../constants/colors";
import StartupScreen from "../screens/StartupScreen";

const AuthStack = createNativeStackNavigator();


const AuthStackNavigator = () => {
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
    <AuthStack.Navigator screenOptions={{ ...defaultNavOptions }}>
      <AuthStack.Screen name="Home" component={StartupScreen} options={{ headerShown: false }} />
      <AuthStack.Screen
        name="Auth"
        component={AuthScreen}
        options={{ headerTitle: "Authenticate", }}
      />
    </AuthStack.Navigator>
  )
}

export default AuthStackNavigator