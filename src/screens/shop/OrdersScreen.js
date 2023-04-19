import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderItem from "../../components/shop/OrderItem";
import * as orderActions from '../../store/actions/orders'
import colors from "../../constants/colors";

const OrdersScreen = () => {
  const { orders } = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const loadOrders = async () => {
    setIsRefreshing(true);
    await dispatch(orderActions.fetchOrders());
    setIsRefreshing(false)
  }
  useEffect(() => {
    setLoading(true)
    loadOrders().then(() => setLoading(false));
  }, [dispatch])
  console.log(orders);
  if(loading){
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    )
  }
  return (
    <FlatList
    onRefresh={loadOrders}
    refreshing={isRefreshing}
      data={orders}
      renderItem={(itemData) => <OrderItem item={itemData.item} />}
    />
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center'
  }
});

export default OrdersScreen;
