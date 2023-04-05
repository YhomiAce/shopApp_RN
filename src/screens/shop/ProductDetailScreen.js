import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";

const ProductDetailScreen = () => {
  const { params } = useRoute();
  const { productId } = params;
  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((item) => item.id === productId)
  );
  return (
    <View>
      <Text>{selectedProduct.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ProductDetailScreen;
