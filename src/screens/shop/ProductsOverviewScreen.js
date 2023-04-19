import { StyleSheet, FlatList, Platform, Button, ActivityIndicator, View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import { useNavigation } from "@react-navigation/native";
import colors from "../../constants/colors";
import * as cartActions from "../../store/actions/cart";
import * as productActions from "../../store/actions/products";

const ProductsOverviewScreen = () => {
  const products = useSelector((state) => state.products.availableProducts);
  const { setOptions, navigate, addListener } = useNavigation();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadProducts = async () => {
    setError(null)
    setIsLoading(true)
    try {
      await dispatch(productActions.fetchProducts())
    } catch (error) {
      setError(error.message)
    }
    setIsLoading(false)
  }
  useEffect(() => {
    loadProducts();
  }, [dispatch])

  useEffect(() => {
    const susbscribtion = addListener("focus", loadProducts);
  }, [addListener])

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

  const viewDetails = (id, title) => {
    navigate("ProductDetail", {
      productId: id,
      title: title,
    });
  };
  const addToCart = (item) => {
    dispatch(cartActions.addToCart(item));
  };

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    )
  }

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.loader}>
        <Text>No Products found. Start Adding some</Text>
      </View>
    )
  }
  if (error) {
    return (
      <View style={styles.loader}>
        <Text>Something went Wrong</Text>
        <Button title="Try Again" onPress={loadProducts} />
      </View>
    )
  }

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          item={itemData.item}
          onSelect={() => viewDetails(itemData.item.id, itemData.item.title)}
        >
          <Button
            title="View Details"
            onPress={() => viewDetails(itemData.item.id, itemData.item.title)}
            color={colors.primary}
          />
          <Button
            title="Add to cart"
            onPress={() => addToCart(itemData.item )}
            color={colors.primary}
          />
        </ProductItem>
      )}
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

export default ProductsOverviewScreen;
