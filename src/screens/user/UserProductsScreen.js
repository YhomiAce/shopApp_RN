import { Alert, Text, FlatList, Button, Platform } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import colors from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import * as productAction from "../../store/actions/products";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";

const UserProductsScreen = () => {
  const { navigate, setOptions } = useNavigation();
  React.useLayoutEffect(() => {
    setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Cart"
            iconName={Platform.OS === "android" ? "md-create" : "ios-create"}
            onPress={() => navigate("EditProduct", { title: "Add Product" })}
          />
        </HeaderButtons>
      ),
    });
  }, [setOptions]);
  const userProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();
  const gotoEdit = (id, title) => {
    navigate("EditProduct", {
      productId: id,
      title: title,
    });
  };
  const onDelete = (id) => {
    Alert.alert("Are You sure?", "Do you really want to delete this item?", [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => dispatch(productAction.deleteProduct(id)),
      },
    ]);
  };
  return (
    <FlatList
      data={userProducts}
      renderItem={(itemData) => (
        <ProductItem
          item={itemData.item}
          onSelect={() => gotoEdit(itemData.item.id, itemData.item.title)}
        >
          <Button
            title="Edit"
            onPress={() => gotoEdit(itemData.item.id, itemData.item.title)}
            color={colors.primary}
          />
          <Button
            title="Delete"
            onPress={() => onDelete(itemData.item.id)}
            color={colors.primary}
          />
        </ProductItem>
      )}
    />
  );
};

export default UserProductsScreen;
