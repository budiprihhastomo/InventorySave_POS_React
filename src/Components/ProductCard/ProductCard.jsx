import React from "react";
import { Card, Col, Button, Icon } from "antd";
import "./ProductCard.css";
import Rupiah from "rupiah-format";

// Redux
import { useSelector, useDispatch } from "react-redux";

const ProductCard = props => {
  const content = useSelector(state => state.Carts.orderList);
  const dispatch = useDispatch();

  const countTotalPrice = () => {
    let totalPrice = props.price
    console.log(content)
    content.forEach(item => {
      totalPrice += (item.price * item.qty)
    })
    console.log(totalPrice)
    dispatch({ type: "SET_CART_TOTAL_PRICE", payload: totalPrice });
  }

  // NOTE Handling Add Item To Cart
  const handlingAddCart = id => {
    const existProduct = content.find(item => item.id === id);
    const objIndex = content.findIndex(item => item.id === props.id)
    // TODO If Data Not Exist : Add item into cart
    if (!existProduct) {
      dispatch({
        type: "SET_CART_ADD",
        payload: { ...props, qty: 1 }
      });
    }
    // TODO If Data Exist : Send item information to validation REDUX
    else {
      content[objIndex].qty += 1
      dispatch({
        type: "SET_CART_ADD_QTY",
        payload: content
      });
    }
    countTotalPrice()
  };

  return (
    <Col sm={24} md={6}>
      <Card
        className="product-card"
        hoverable
        cover={
          <div
            className="product-frame"
            style={{
              backgroundImage: `url(${process.env.REACT_APP_SERVER_API}../../${props.image})`
            }}
          ></div>
        }
      >
        <div className="product-group">
          <span className="product-content product-title">{props.name}</span>
          <span className="product-content product-price">
            {Rupiah.convert(props.price)}
          </span>
          <span className="product-content product-qty">
            <Icon type="stock" />: {props.stock}
          </span>
          <Button
            className="product-cart"
            type="primary"
            onClick={() => handlingAddCart(props.id)}
          >
            <Icon type="shopping" />
          </Button>
        </div>
      </Card>
    </Col>
  );
};

export default ProductCard;
