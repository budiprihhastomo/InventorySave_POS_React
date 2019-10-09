const initialState = {
  orderList: [],
  totalPrice: 0
};

const Cart = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_CART_ADD":
      return {
        orderList: [...state.orderList, payload]
      };
    case "SET_CART_ADD_QTY":
      return { orderList: payload };
    case "SET_CART_MIN_QTY":
      return { orderList: payload };
    case "SET_CART_TOTAL_PRICE":
      return { ...state, totalPrice: payload };
    default:
      return state;
  }
};

export default Cart;
