import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Platform,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import { useDispatch, useSelector } from "react-redux";
import * as productAction from "../../store/actions/products";

const EditProductScreen = () => {
  const { setOptions, setParams, goBack } = useNavigation();
  const { params } = useRoute();
  const { productId } = params;
  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((item) => item.id === productId)
  );
  const dispatch = useDispatch();

  console.log(params);

  React.useLayoutEffect(() => {
    setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Cart"
            iconName={Platform.OS === "android" ? "md-save" : "ios-save"}
            onPress={() => params.submit()}
          />
        </HeaderButtons>
      ),
      headerTitle: params.title,
    });
  }, [setOptions]);

  const [title, setTitle] = useState(editedProduct ? editedProduct.title : "");
  const [imageUrl, setImageUrl] = useState(
    editedProduct ? editedProduct.imageUrl : ""
  );
  const [price, setPrice] = useState(
    editedProduct ? editedProduct.price.toString() : ""
  );
  const [description, setDescription] = useState(
    editedProduct ? editedProduct.description : ""
  );

  const onSubmit = useCallback(() => {
    console.log("submitting");
    const payload = {
      title,
      price: +price,
      imageUrl,
      description,
    };
    if (editedProduct) {
      payload.id = productId;
      dispatch(productAction.updateProduct(payload));
    } else {
      dispatch(productAction.createProduct(payload));
    }
    goBack();
  }, [dispatch, title, productId, description, imageUrl, price]);

  useEffect(() => {
    setParams({ submit: onSubmit });
  }, []);
  const handleTitleChange = (text) => {
    console.log(text);
    setTitle(text)
  }

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={handleTitleChange}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image Url</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={(text) => setImageUrl(text)}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Price</Text>
          <TextInput
            style={styles.input}
            value={price}
            onChangeText={(text) => setPrice(text)}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: "100%",
  },
  label: {
    fontFamily: "open-sans-bold",
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
});

export default EditProductScreen;
