import { Button, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import CartItem from "./CartItem";
import colors from "../../constants/colors";

const OrderItem = ({ item }) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <View style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>${item.totalAmount.toFixed(2)}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <Button
        color={colors.primary}
        title={showDetails ? "Hide Details" : "Show Details"}
        onPress={() => setShowDetails((prevState) => !prevState)}
      />
      {showDetails && (
        <View style={styles.detailItems}>
          {item.items.map((cartItem) => (
            <CartItem
              key={cartItem.productId}
              item={cartItem}
              showButton={false}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "#fff",
    margin: 20,
    padding: 10,
    alignItems: "center",
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  totalAmount: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
  date: {
    fontFamily: "open-sans",
    fontSize: 16,
    color: "#888",
  },
  detailItems: {
    width: "100%",
  },
});

export default OrderItem;
