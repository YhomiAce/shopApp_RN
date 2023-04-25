import { URL } from "../../constants/url";
import Order from "../../models/order";

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch, getState) => {
    try {
      const token = getState().auth.token;
      const userId = getState().auth.userId;
      const date = new Date();
      const response = await fetch(`${URL}/orders/${userId}.json?auth=${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          items: cartItems,
          totalAmount,
          date: date.toISOString()
        })
      });
      if (!response.ok) {
        throw new Error('Something went wrong')
      }
      const result = await response.json();
      console.log(result);
      dispatch({
        type: ADD_ORDER,
        payload: {
          id: result.name,
          items: cartItems,
          amount: totalAmount,
          date
        },
      });
    } catch (error) {
      throw error;
    }
  }
}

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    try {
      const userId = getState().auth.userId;
      const response = await fetch(`${URL}/orders/${userId}.json`);
      if (!response.ok) {
        throw new Error('Something went wrong')
      }
      const result = await response.json();
      const loadedOrders = [];

      for (const key in result) {
        loadedOrders.push(new Order(key, result[key].items, result[key].totalAmount, new Date(result[key].date).toLocaleDateString('en-EN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })))
      }
      dispatch({
        type: SET_ORDERS,
        payload: loadedOrders,
      })
    } catch (error) {
      throw error;
    }
  }
}