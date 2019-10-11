import React, { useState, useEffect } from "react";
import { Drawer, Button, Modal, Col, Row } from "antd";
import "./DrawerPart.css";
import CartItem from "../CartItem/CartItem";
import Rupiah from "rupiah-format";
import Swal from "sweetalert2-react"
import { orderProducts } from '../../Public/Redux/Actions/Products'

// Redux
import { useSelector, useDispatch } from "react-redux";

// Modal Remove Cart Item
const { confirm } = Modal;

const DrawerPart = props => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isExistCart, setIsExistCart] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [isAlert, setIsAlert] = useState(false)
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
    if (content.orderList.length > 0) return setIsExistCart(false);
    else return setIsExistCart(true);
  }, [[], isExistCart]);

  const toggleCart = () => {
    props.resVisibleCart(false);
  };

  const toggleSearch = () => {
    props.resVisibleSearch(false);
  };

  const handlePostOrder = () => {
    let dataHeader = {transaction_price: totalPrice + ((10/100) * totalPrice), user_id: '1bb1b730-eb0b-11e9-8731-f7d41e13cf40'}
    let dataDetail = []
    content.orderList.map(item => {
      dataDetail.push([item.id, item.qty, item.price])
    })
    orderProducts(dataHeader, dataDetail)
  }

  const handlePaymentOrder = () => {
    confirm({
      title: "Are you sure to order the products?",
      content: "Transaction will be carried out and cannot to canceled.",
      okText: "Agree",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        handlePostOrder()
        setIsLoading(true)
        setTimeout(() => {
          setIsLoading(false)
          setVisibleModal(true);
        }, 2500);
      }
    });
  };
  
  const handleCancelOrder = () => {
    confirm({
      title: "Are you sure to cancel the order?",
      content: "Orders will be destroyed and you must select the product again",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        dispatch({ type: "DEL_CART_ALL_ORDER", payload: [] });
      }
    });
  };
  
  const handleSendEmail = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsAlert(true)
      setIsLoading(false)
      setVisibleModal(false)
      dispatch({ type: "DEL_CART_ALL_ORDER", payload: [] });
    }, 3000);
  }

  const ListOrderCheckout = props => {
    return (
      <Row gutter={8} className="modal-list">
        <Col sm={8}>
          <span className="modal-name">{props.name}</span>
        </Col>
        <Col sm={8}>
          <span className="modal-qty">{props.qty}pcs</span>
        </Col>
        <Col sm={8}>
          <span className="modal-subprice">
            {Rupiah.convert(props.subprice)}
          </span>
        </Col>
      </Row>
    );
  };

  const AlertTransaction = () => {
    return(
      <Swal
        show={isAlert}
        type="success"
        title="Order Processed"
        text="An email has been sent, check your inbox."
        onConfirm={() => setIsAlert(false)}
      />
    )
  }

  return (
    <>
      <AlertTransaction />
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
              onClick={handlePaymentOrder}
              disabled={isExistCart}
              loading={isLoading}
            >
              Checkout
            </Button>
            <Button
              className="btn-draw"
              block
              type="danger"
              onClick={handleCancelOrder}
              disabled={isExistCart}
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
        title="Order List"
        visible={visibleModal}
        closable={false}
        footer={[<Button key="print" type="danger" icon="printer">Print</Button>,<Button key="buy" type="primary" onClick={handleSendEmail} loading={isLoading} icon="mail">Send Email</Button>]}
      >
        <div className="modal-head">
          <span className="modal-receipt">Receipt no : #0000000000</span>
          <span className="modal-cashier">Cashier : Pecita Pearce</span>
        </div>
        <div className="modal-checkout">
          {content.orderList.map(item => {
            return (
              <ListOrderCheckout
                name={item.name}
                qty={item.qty}
                subprice={item.price * item.qty}
              />
            );
          })}
        </div>
        <div className="modal-foot">
          <Row gutter={8}>
            <Col sm={12} className="modal-right-sect">
              <span>Tax 10 % :</span>
            </Col>
            <Col sm={12} className="modal-right-sect">
              <span className="modal-tax">
                {Rupiah.convert((10 / 100) * totalPrice)}
              </span>
            </Col>
            <Col sm={12} className="modal-right-sect">
              <span>Total Price :</span>
            </Col>
            <Col sm={12} className="modal-right-sect">
              <span className="modal-tax">
                {Rupiah.convert(totalPrice + (10 / 100) * totalPrice)}
              </span>
            </Col>
            <Col sm={12} className="modal-right-sect">
              <span>Payment :</span>
            </Col>
            <Col sm={12} className="modal-right-sect">
              <span>Cash</span>
            </Col>
          </Row>
        </div>
      </Modal>
    </>
  );
};

export default DrawerPart;
