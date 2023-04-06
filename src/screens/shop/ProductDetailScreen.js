import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Button,
} from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import colors from "../../constants/colors";
import * as cartActions from "../../store/actions/cart";

const ProductDetailScreen = () => {
  const { params } = useRoute();
  const dispatch = useDispatch();
  const { productId } = params;
  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((item) => item.id === productId)
  );
  const carts = useSelector((state) => state.carts);
  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
      <View style={styles.buttonContainer}>
        <Button
          color={colors.primary}
          title="Add to Cart"
          onPress={() => {
            dispatch(cartActions.addToCart(selectedProduct));
          }}
        />
      </View>
      <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  price: {
    fontSize: 20,
    color: "#888",
    textAlign: "center",
    marginVertical: 20,
    fontFamily: "open-sans-bold",
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 20,
    fontFamily: "open-sans",
  },
  buttonContainer: {
    marginVertical: 10,
    alignItems: "center",
  },
});

export default ProductDetailScreen;
