import CartItem from "../../models/cart-item";
import { ADD_TO_CART } from "../actions/cart";

const initialState = {
  items: [],
  totalAmount: 0,
};

const CartReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_TO_CART:
      let oldCarts = [...state.items];
      console.log(payload.id);
      const exist = oldCarts.find((item) => item.productId === payload.id);
      if (exist) {
        // already have item in the cart
        const updatedCartItem = new CartItem(
          exist.id,
          exist.quantity + 1,
          payload.price,
          payload.title,
          exist.sum + payload.price
        );

        const index = oldCarts.findIndex(
          (item) => item.productId === payload.id
        );
        oldCarts[index] = updatedCartItem;
      } else {
        // new cart Item
        const newCartItem = new CartItem(
          payload.id,
          1,
          payload.price,
          payload.title,
          payload.price
        );
        oldCarts = [...oldCarts, newCartItem];
      }
      return {
        ...state,
        items: oldCarts,
        totalAmount: state.totalAmount + payload.price,
      };
    default:
      return state;
  }
};
export default CartReducer;
