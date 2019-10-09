const initialState = {
  productList: [],
  isLoading: false,
  isRejected: false,
  isFulFilled: false
};

const Products = (state = initialState, { type, payload }) => {
  switch (type) {
    case "GET_PRODUCT_LOADING":
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulFilled: false
      };
    case "GET_PRODUCT_REJECTED":
      return {
        ...state,
        isLoading: false,
        isRejected: true,
        isFulFilled: false
      };
    case "GET_PRODUCT_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isRejected: false,
        isFulFilled: true,
        productList: payload
      };
    default:
      return state;
  }
};

export default Products;
