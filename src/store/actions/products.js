import Product from "../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const FETCH_PRODUCTS = "FETCH_PRODUCTS";

const URL = 'https://rnshopapp-f9de4-default-rtdb.firebaseio.com';

export const deleteProduct = (productId) => {
  return async dispatch => {
    try {
      const response = await fetch(`${URL}/products/${productId}.json`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (!response.ok) {
        throw new Error('Something went wrong')
      }
      const result = await response.json();
      console.log(result);
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
  return async dispatch => {
    try {
      const response = await fetch(`${URL}/products.jso`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        throw new Error('Something went wrong')
      }
      const result = await response.json();
      console.log(result);
      dispatch({
        type: CREATE_PRODUCT,
        payload: {
          ...payload,
          id: result.name
        },
      });
    } catch (error) {
      throw error;
    }   
  }
};

export const updateProduct = (payload) => {
  return async dispatch => {
    try {
      const response = await fetch(`${URL}/products/${payload.id}.json`, {
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
      console.log(result);
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
  return async dispatch  => {
    try {
      const response = await fetch(`${URL}/products.json`);
      if (!response.ok) {
        throw new Error('Something went wrong')
      }
      const result = await response.json();
      const loadedProducts = [];

      for(const key in result){
        loadedProducts.push(new Product(key, 'u1', result[key].title, result[key].imageUrl, result[key].description, result[key].price))
      }
      console.log(result);
      dispatch({
          type: FETCH_PRODUCTS,
          payload: loadedProducts,
      })
    } catch (error) {
      console.log(error);
      throw error;
    }

  }
};
