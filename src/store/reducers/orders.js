import Order from "../../models/order";
import { ADD_ORDER, SET_ORDERS } from "../actions/orders";

const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_ORDERS:
    return {
      ...state,
      orders: payload
    }
    case ADD_ORDER:
      const newOrder = new Order(
        payload.id,
        payload.items,
        payload.amount,
        payload.date.toLocaleDateString('en-EN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
      })
      );
      return {
        ...state,
        orders: [newOrder, ...state.orders],
      };

    default:
      return state;
  }
};
