import React from "react";
import { Card, Avatar, Button, Icon, Input } from "antd";
import "./CartItem.css";
import Rupiah from "rupiah-format";

import { useSelector, useDispatch } from "react-redux";

const CartItem = props => {
  const content = useSelector(state => state.Carts.orderList);
  const fetchData = content.find(item => item.id === props.id);
  const objIndex = content.findIndex(item => item.id === props.id)
  const dispatch = useDispatch();

  const countTotalPrice = () => {
    let totalPrice = 0
    content.forEach(item => {
      totalPrice += (item.price * item.qty)
    })
    dispatch({ type: "SET_CART_TOTAL_PRICE", payload: totalPrice });
  }

  const handleAddItemToCart = () => {
    content[objIndex].qty += 1
    dispatch({ type: "SET_CART_ADD_QTY", payload: content });
    countTotalPrice()
  };

  const handleMinItemToCart = () => {
    const objIndex = content.findIndex(item => item.id === props.id)
    content[objIndex].qty -= 1
    dispatch({ type: "SET_CART_MIN_QTY", payload: content });
    countTotalPrice()
  };

  return (
    <Card className="cart-item">
      <div className="cart-content">
        <Avatar
          src={`${process.env.REACT_APP_SERVER_API}../../${props.image}`}
        />
      </div>
      <div className="cart-content">
        <div className="cart-title">
          <h3>{props.name}</h3>
        </div>
        <div className="cart-body">
          <Button
            className="cart-button"
            type="primary"
            shape="circle"
            onClick={handleMinItemToCart}
          >
            <Icon className="btn-cart-icon" type="minus" />
          </Button>
          <Input className="cart-qty" value={fetchData.qty} />
          <Button
            className="cart-button"
            type="primary"
            shape="circle"
            onClick={handleAddItemToCart}
          >
            <Icon className="btn-cart-icon" type="plus" />
          </Button>
        </div>
        <div className="cart-price">
          <span>{Rupiah.convert(fetchData.price * fetchData.qty)}</span>
        </div>
      </div>
    </Card>
  );
};

export default CartItem;
