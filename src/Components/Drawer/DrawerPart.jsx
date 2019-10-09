import React, { useState, useEffect } from "react";
import { Drawer, Button, Icon, Row, Col, Modal } from "antd";
import "./DrawerPart.css";
import CartItem from "../CartItem/CartItem";
import Rupiah from "rupiah-format";

// Redux
import { useSelector, useDispatch } from "react-redux";

const DrawerPart = props => {
  const [visibleModal, setVisibleModal] = useState(false);
  const content = useSelector(state => state.Carts);
  const dispatch = useDispatch()

  const handleOpen = data => {
    setVisibleModal(true);
  };

  const handleOK = data => {
    setVisibleModal(false);
  };

  const handleCancel = data => {
    setVisibleModal(false);
  };

  const toggleCart = () => {
    props.resVisibleCart(false);
  };

  const toggleSearch = () => {
    props.resVisibleSearch(false);
  };

  return (
    <>
      <Drawer
        className="cart-drawer"
        title="My Cart"
        placement="right"
        onClose={toggleCart}
        visible={props.reqVisibleCart}
        width={360}
      >
        <div className="body-cart">
          {content.orderList.map((item, index) => {
            return (
              <CartItem
                key={index}
                id={item.id}
                name={item.name}
                price={item.price}
                stock={item.qty}
                image={item.image}
              />
            );
          })}
        </div>
        <div className="footer-cart">
          <div className="text-cart">
            <span className="text-total">Total : </span>
            <span className="text-total-result">{Rupiah.convert(content.totalPrice)}</span>
          </div>
          <p className="text-tax">
            <span style={{ color: "red" }}>* </span>Not include tax
          </p>
          <div className="btn-group">
            <Button
              className="btn-draw"
              block
              type="primary"
              onClick={handleOpen}
            >
              Checkout
            </Button>
            <Button className="btn-draw" block type="danger">
              Cancel
            </Button>
          </div>
        </div>
      </Drawer>

      <Drawer
        title="Search Product"
        placement="bottom"
        onClose={toggleSearch}
        visible={props.reqVisibleSearch}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>

      <Modal
        title="Basic Modal"
        visible={visibleModal}
        onOk={handleOK}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default DrawerPart;
