import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Platform,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState, useCallback, useReducer } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import { useDispatch, useSelector } from "react-redux";
import * as productAction from "../../store/actions/products";
import Input from "../../components/UI/Input";
import { Keyboard } from "react-native";


const EditProductScreen = () => {
  const { setOptions, setParams, goBack, } = useNavigation();
  const { params, } = useRoute();
  const { productId } = params;
  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((item) => item.id === productId)
  );
  const dispatch = useDispatch();

  React.useLayoutEffect(() => {
    setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Cart"
            iconName={Platform.OS === "android" ? "md-save" : "ios-save"}
            onPress={params.submit}
          />
        </HeaderButtons>
      ),
      headerTitle: params.title,
    });
  }, [setOptions, params.submit]);
  const [formState, setFormState] = useState({
    title: editedProduct ? editedProduct.title : "",
    imageUrl: editedProduct ? editedProduct.imageUrl : "",
    price: editedProduct ? editedProduct.price.toString() : "",
    description: editedProduct ? editedProduct.description : ""
  });
  
  const {title, imageUrl, price, description} = formState


  const onSubmit = useCallback(() => {
    console.log("submitting");
    if (!title || !imageUrl || !price || !description) {
      Alert.alert('Wrong input!', 'Please fill all fields', [{ text: 'Okay' }]);
      return;
    }
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
  }, [onSubmit]);

  const inputChangeHandler = (field, text) => {
    setFormState({
      ...formState,
      [field]: text
    })
  }

  return (
    <KeyboardAvoidingView>
    <ScrollView>
      <View style={styles.form}>
        <Input 
        label="Title"
        onInputChange={inputChangeHandler}
        id="title"
        value={title}
        />
        <Input 
        label="Image Url"
        value={imageUrl}
        onInputChange={inputChangeHandler}
        id="imageUrl"
        />
        <Input 
        label="Price" 
        keyboardType="decimal-pad"
        onInputChange={inputChangeHandler}
        id="price"
        value={price}
        />
        <Input 
        label="Description" 
        multiline numberOfLines={3} 
        onInputChange={inputChangeHandler}
        id="description"
        value={description}
        />
      </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },

});

export default EditProductScreen;
