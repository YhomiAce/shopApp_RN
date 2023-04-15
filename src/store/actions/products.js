export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";

export const deleteProduct = (productId) => {
  return {
    type: DELETE_PRODUCT,
    payload: {
      id: productId,
    },
  };
};

export const createProduct = (payload) => {
  return {
    type: CREATE_PRODUCT,
    payload,
  };
};

export const updateProduct = (payload) => {
  return {
    type: UPDATE_PRODUCT,
    payload,
  };
};
