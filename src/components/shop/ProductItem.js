import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
  Platform,
  TouchableNativeFeedback,
} from "react-native";
import React from "react";
import colors from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";

const ProductItem = ({ item }) => {
  let TouchableComponent = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }
  const { navigate } = useNavigation();
  const viewDetails = () => {
    navigate("ProductDetail", {
      productId: item.id,
      title: item.title,
    });
  };
  const addToCart = () => {};
  return (
    <TouchableComponent onPress={viewDetails} useForeground>
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image style={styles.image} source={{ uri: item.imageUrl }} />
        </View>
        <View style={styles.details}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        </View>
        <View style={styles.actions}>
          <Button
            title="View Details"
            onPress={viewDetails}
            color={colors.primary}
          />
          <Button
            title="Add to cart"
            onPress={addToCart}
            color={colors.primary}
          />
        </View>
      </View>
    </TouchableComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "#fff",
    height: 300,
    margin: 20,
  },
  imgContainer: {
    width: "100%",
    height: "60%",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 18,
    marginVertical: 4,
  },
  price: {
    fontSize: 14,
    color: "#888",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "25%",
    paddingHorizontal: 20,
  },
  details: {
    alignItems: "center",
    height: "15%",
    // padding: 10,
  },
});

export default ProductItem;
