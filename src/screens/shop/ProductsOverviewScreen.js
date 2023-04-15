import { StyleSheet, FlatList, Platform, Button } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import { useNavigation } from "@react-navigation/native";
import colors from "../../constants/colors";
import * as cartActions from "../../store/actions/cart";

const ProductsOverviewScreen = () => {
  const products = useSelector((state) => state.products.availableProducts);
  const { setOptions, navigate } = useNavigation();
  const dispatch = useDispatch();

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

const styles = StyleSheet.create({});

export default ProductsOverviewScreen;
