import { StyleSheet, FlatList, Platform } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import { useNavigation } from "@react-navigation/native";

const ProductsOverviewScreen = () => {
  const products = useSelector((state) => state.products.availableProducts);
  const { setOptions, navigate } = useNavigation();

  React.useLayoutEffect(() => {
    setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Cart"
            iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
            onPress={() => navigate("Cart")}
          />
        </HeaderButtons>
      ),
    });
  }, [setOptions]);

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
