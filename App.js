import "react-native-gesture-handler";
import { Provider } from "react-redux";
import store from "./src/store/store";
import ShopNavigation from "./src/navigation/ShopNavigation";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { useState } from "react";
import DrawerNavigation from "./src/navigation/DrawerNavigation";
import { NavigationContainer } from "@react-navigation/native";

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(error) => console.warn(error)}
      />
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <ShopNavigation />
      </NavigationContainer>
    </Provider>
  );
}
