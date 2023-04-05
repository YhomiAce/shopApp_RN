import PRODUCTS from '../../data/dummy-data.js';

const initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(item => item.ownerId === "u1")
}

const ProductReducer = (state = initialState, action) => {
    const { type, payload} = action;
    switch(type){
        default: return state;
    }
}

export default ProductReducer;