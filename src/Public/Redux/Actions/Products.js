import Axios from "axios";

export const getProducts = async () => {
  const result = await Axios.get(`${process.env.REACT_APP_SERVER_API}products`);
  return {
    type: "GET_PRODUCT_FULFILLED",
    payload: result.data.data.content
  };
};

export const orderProducts = async ({transaction_price, user_id}, dataDetail) => {
    const dataInsert = {transaction_price,user_id,order_detail:dataDetail}
  const result = await Axios.post(
    `${process.env.REACT_APP_SERVER_API}transaction`, dataInsert);
  return {
    response: result
  };
};
