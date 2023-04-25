import { URL } from "../../constants/url";
import Product from "../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const FETCH_PRODUCTS = "FETCH_PRODUCTS";


export const deleteProduct = (productId) => {
  return async (dispatch, getState) => {
    try {
      const token = getState().auth.token;
      const response = await fetch(`${URL}/products/${productId}.json?auth=${token}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (!response.ok) {
        throw new Error('Something went wrong')
      }
      const result = await response.json();
      // console.log(result);
      dispatch({
        type: DELETE_PRODUCT,
        payload:{id: productId},
      });
    } catch (error) {
      throw error;
    }  
  }
};

export const createProduct = (payload) => {
  return async (dispatch, getState) => {
    try {
      const token = getState().auth.token;
      const userId = getState().auth.userId;
      const response = await fetch(`${URL}/products.json?auth=${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({...payload, ownerId: userId})
      });
      if (!response.ok) {
        throw new Error('Something went wrong')
      }
      const result = await response.json();
      // console.log(result);
      dispatch({
        type: CREATE_PRODUCT,
        payload: {
          ...payload,
          id: result.name,
          ownerId: userId
        },
      });
    } catch (error) {
      throw error;
    }   
  }
};

export const updateProduct = (payload) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    try {
      const response = await fetch(`${URL}/products/${payload.id}.json?auth=${token}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        throw new Error('Something went wrong')
      }
      const result = await response.json();
      // console.log(result);
      dispatch({
        type: UPDATE_PRODUCT,
        payload,
      });
    } catch (error) {
      throw error;
    }  
  }
};

export const fetchProducts = () => {
  return async (dispatch, getState)  => {
    try {
      const userId = getState().auth.userId;
      const response = await fetch(`${URL}/products.json`);
      if (!response.ok) {
        throw new Error('Something went wrong')
      }
      const result = await response.json();
      const loadedProducts = [];

      for(const key in result){
        loadedProducts.push(new Product(key, result[key].ownerId, result[key].title, result[key].imageUrl, result[key].description, result[key].price))
      }
      // console.log(result);
      dispatch({
          type: FETCH_PRODUCTS,
          payload: {
            loadedProducts,
            userProducts: loadedProducts.filter(item => item.ownerId === userId)
          },
      })
    } catch (error) {
      console.log(error);
      throw error;
    }

  }
};
