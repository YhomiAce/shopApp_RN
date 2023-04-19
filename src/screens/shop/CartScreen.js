import { View, Text, StyleSheet, Button, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import colors from "../../constants/colors";
import CartItem from "../../components/shop/CartItem";
import * as orderActions from "../../store/actions/orders";
import Card from "../../components/UI/Card";

const CartScreen = () => {
  const { totalAmount, items } = useSelector((state) => state.carts);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);
  const orderNowHandler = async() => {
    setIsLoading(true)
    await dispatch(orderActions.addOrder(items, totalAmount));
    setIsLoading(false);
  }
  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total: <Text style={styles.amount}>${totalAmount.toFixed(2)}</Text>
        </Text>
        {isLoading ? <ActivityIndicator size="small" color={colors.primary} /> :
        <Button
          color={colors.accent}
          title="Order Now"
          disabled={items.length === 0}
          onPress={orderNowHandler}
        />
      }
      </Card>
      <FlatList
        data={items}
        keyExtractor={(item) => item.productId}
        renderItem={(itemData) => <CartItem item={itemData.item} />}
      />
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
