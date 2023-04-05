import { Text, StyleSheet, FlatList } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";

const ProductsOverviewScreen = () => {
  const products = useSelector((state) => state.products.availableProducts);
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => <ProductItem item={itemData.item} />}
    />
  );
};

const styles = StyleSheet.create({});

export default ProductsOverviewScreen;
