import { View, Text, FlatList } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import OrderItem from "../../components/shop/OrderItem";

const OrdersScreen = () => {
  const { orders } = useSelector((state) => state.orders);
  console.log(orders);
  return (
    <FlatList
      data={orders}
      renderItem={(itemData) => <OrderItem item={itemData.item} />}
    />
  );
};

export default OrdersScreen;
