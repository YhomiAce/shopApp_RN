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
import Card from "../UI/Card";

const ProductItem = (props) => {
  const {item, onSelect} = props;
 
  let TouchableComponent = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }
  
  return (
    <TouchableComponent onPress={onSelect} useForeground>
      <Card style={styles.container}>
        <View style={styles.imgContainer}>
          <Image style={styles.image} source={{ uri: item.imageUrl }} />
        </View>
        <View style={styles.details}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        </View>
        <View style={styles.actions}>
          {props.children}
        </View>
      </Card>
    </TouchableComponent>
  );
};

const styles = StyleSheet.create({
  container: {
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
    fontFamily: "open-sans-bold",
  },
  price: {
    fontSize: 14,
    color: "#888",
    fontFamily: "open-sans",
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
