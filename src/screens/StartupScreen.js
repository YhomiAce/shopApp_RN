import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import * as authAction from "../store/actions/auth";

const StartupScreen = () => {
  const { navigate } = useNavigation();
  const dispatch = useDispatch();
  const tryLogin = async () => {
    const userData = await AsyncStorage.getItem("userData");
    if (!userData) {
      navigate("Auth");
      return;
    }
    const data = JSON.parse(userData);
    const { userId, token, expiryDate } = data;
    const expirationDate = new Date(expiryDate);
    if (expirationDate <= new Date() || !token || !userId) {
      navigate("Auth");
      return;
    }
    const expirationTime = expirationDate.getTime() - new Date().getTime();
    dispatch(authAction.authenticate(token, userId, expirationTime));
    navigate("Products");
  };
  useEffect(() => {
    tryLogin();
  }, []);
  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StartupScreen;
