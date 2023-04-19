import PRODUCTS from "../../data/dummy-data.js";
import Product from "../../models/product.js";
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  FETCH_PRODUCTS,
  UPDATE_PRODUCT,
} from "../actions/products.js";

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((item) => item.ownerId === "u1"),
};

const ProductReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_PRODUCTS:
      return {
        availableProducts: payload,
        userProducts: payload.filter((item) => item.ownerId === "u1"),
      }
    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(
          (item) => item.id !== payload.id
        ),
        availableProducts: state.availableProducts.filter(
          (item) => item.id !== payload.id
        ),
      };
    case CREATE_PRODUCT:
      console.log(payload);
      const newProduct = new Product(
        payload.id,
        "u1",
        payload.title,
        payload.imageUrl,
        payload.description,
        payload.price
      );
      return {
        ...state,
        availableProducts: [newProduct, ...state.availableProducts],
        userProducts: [newProduct, ...state.userProducts],
      };
    case UPDATE_PRODUCT:
      console.log(payload);
      const prodIndex = state.userProducts.findIndex(
        (item) => item.id === payload.id
      );
      const updatedProduct = new Product(
        payload.id,
        state.userProducts[prodIndex].ownerId,
        payload.title,
        payload.imageUrl,
        payload.description,
        payload.price
      );
      const updatedUserProducts = [...state.userProducts];
      const updatedAvailableProducts = [...state.availableProducts];
      const availableProductsIndex = state.availableProducts.findIndex(
        (item) => item.id === payload.id
      );
      updatedUserProducts[prodIndex] = updatedProduct;
      updatedAvailableProducts[availableProductsIndex] = updatedProduct;
      return {
        ...state,
        availableProducts: updatedAvailableProducts,
        userProducts: updatedUserProducts,
      };
    default:
      return state;
  }
};

export default ProductReducer;
