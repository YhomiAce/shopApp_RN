import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import { useDispatch, useSelector } from "react-redux";
import * as productAction from "../../store/actions/products";
import Input from "../../components/UI/Input";
import colors from "../../constants/colors";


const EditProductScreen = () => {
  const { setOptions, setParams, goBack, } = useNavigation();
  const { params, } = useRoute();
  const { productId } = params;
  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((item) => item.id === productId)
  );
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); 

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
  
  const {title, imageUrl, price, description} = formState;

  const onSubmit = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
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
        await dispatch(productAction.updateProduct(payload));
      } else {
        await dispatch(productAction.createProduct(payload));
      }
      goBack();
    } catch (error) {
      console.log(error);
      setError(error.message)
    }
    setIsLoading(false);
   
  }, [dispatch, title, productId, description, imageUrl, price]);

  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occured!', error, [{ text: 'Okay' }]);
    }
  }, [error])

  useEffect(() => {
    setParams({ submit: onSubmit });
  }, [onSubmit]);

  const inputChangeHandler = (field, text) => {
    setFormState({
      ...formState,
      [field]: text
    })
  }

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    )
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
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center'
  }
});

export default EditProductScreen;
