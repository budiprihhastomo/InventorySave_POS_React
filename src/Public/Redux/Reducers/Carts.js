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
    case "DEL_CART_PRODUCT":
      return { orderList: payload };
    case "DEL_CART_ALL_ORDER":
      return { orderList: payload };
    default:
      return state;
  }
};

export default Cart;
