import CartItem from "../../models/cart-item";
import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import { ADD_ORDER } from "../actions/orders";
import { DELETE_PRODUCT } from "../actions/products";

const initialState = {
  items: [],
  totalAmount: 0,
};

const CartReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_TO_CART:
      let oldCarts = [...state.items];
      const exist = oldCarts.find((item) => item.productId === payload.id);
      if (exist) {
        // already have item in the cart
        const updatedCartItem = new CartItem(
          exist.productId,
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

    case REMOVE_FROM_CART:
      let oldItems = [...state.items];
      const cartItem = oldItems.find((item) => item.productId === payload.id);

      if (cartItem.quantity > 1) {
        // reduce the quantity by 1
        const updatedCartItem = new CartItem(
          cartItem.productId,
          cartItem.quantity - 1,
          cartItem.productPrice,
          cartItem.productTitle,
          cartItem.sum - cartItem.productPrice
        );
        const cartIndex = oldItems.findIndex(
          (item) => item.productId === payload.id
        );
        oldItems[cartIndex] = updatedCartItem;
      } else {
        oldItems = oldItems.filter((item) => item.productId !== payload.id);
      }
      return {
        ...state,
        items: oldItems,
        totalAmount: state.totalAmount - cartItem.productPrice,
      };
    case ADD_ORDER:
      return initialState;
    case DELETE_PRODUCT:
      let oldCartItems = [...state.items];
      let oldTotalAmunt = state.totalAmount;
      const itemExist = oldCartItems.find((item) => item.productId === payload.id);
      if (itemExist) {
       oldCartItems = oldCartItems.filter((item) => item.productId !== payload.id);
        oldTotalAmunt = oldTotalAmunt - itemExist.sum;
      }
      return {
        ...state,
        items: oldCartItems,
        totalAmount: oldTotalAmunt,
      };
    default:
      return state;
  }
};
export default CartReducer;
