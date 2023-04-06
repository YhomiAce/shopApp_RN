import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { useDispatch } from "react-redux";
import * as cartActions from "../../store/actions/cart";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const onRemove = () => {
    console.log("remove", item);
    dispatch(cartActions.removeFromCart(item.productId));
  };
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <Text style={styles.qty}>{item.quantity} </Text>
        <Text style={styles.mainText}>{item.productTitle}</Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.mainText}>${item.sum.toFixed(2)}</Text>
        <TouchableOpacity onPress={onRemove} style={styles.deleteButton}>
          <Ionicons
            name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
            size={23}
            color="red"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  itemData: {
    flexDirection: "row",
    alignItems: "center",
  },
  qty: {
    fontFamily: "open-sans",
    color: "#888",
    fontSize: 16,
  },
  mainText: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
  deleteButton: {
    marginLeft: 20,
  },
});

export default CartItem;
