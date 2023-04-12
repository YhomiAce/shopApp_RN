import Order from "../../models/order";
import { ADD_ORDER } from "../actions/orders";

const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_ORDER:
      const newOrder = new Order(
        new Date().toString(),
        payload.items,
        payload.amount,
        new Date().toLocaleDateString('en-EN', {
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
