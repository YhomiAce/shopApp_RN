import { View, Text, StyleSheet, Button } from "react-native";
import React from "react";
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import colors from "../../constants/colors";

const CartScreen = () => {
  const { totalAmount, items } = useSelector((state) => state.carts);
  
  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total: <Text style={styles.amount}>$ {totalAmount.toFixed(2)}</Text>
        </Text>
        <Button
          color={colors.accent}
          title="Order Now"
          disabled={items.length === 0}
        />
      </View>
      <View>
        <Text>CART ITEMS</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  amount: {
    color: colors.primary,
  },
});

export default CartScreen;
