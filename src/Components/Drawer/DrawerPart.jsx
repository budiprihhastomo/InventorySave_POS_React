import React, { useState, useEffect } from "react";
import { Drawer, Button, Modal } from "antd";
import "./DrawerPart.css";
import CartItem from "../CartItem/CartItem";
import Rupiah from "rupiah-format";
import SweetAlert from "sweetalert2-react";

// Redux
import { useSelector, useDispatch } from "react-redux";

const DrawerPart = props => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [visibleSwal, setVisibleSwal] = useState(false)
  const content = useSelector(state => state.Carts);
  const dispatch = useDispatch();
  const countTotalPrice = () => {
    let TotalPrice = 0;
    content.orderList.forEach(item => {
      TotalPrice += item.price * item.qty;
    });
    setTotalPrice(TotalPrice);
  };

  useEffect(() => {
    countTotalPrice();
  });

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

  const handleCancelOrder = () => {
    setVisibleSwal(true)
    return dispatch({ type: "DEL_CART_ALL_ORDER", payload: [] });
  };

  const AlertModal = () => {
    return (
      <SweetAlert
        show={visibleSwal}
        title="Demo"
        text="SweetAlert in React"
        onConfirm={() => setVisibleSwal(false)}
      />
    );
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
                stock={item.stock}
                qty={item.qty}
                image={item.image}
              />
            );
          })}
        </div>
        <div className="footer-cart">
          <div className="text-cart">
            <span className="text-total">Total : </span>
            <span className="text-total-result">
              {Rupiah.convert(totalPrice)}
            </span>
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
            <Button
              className="btn-draw"
              block
              type="danger"
              onClick={handleCancelOrder}
            >
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

      <AlertModal />
    </>
  );
};

export default DrawerPart;
