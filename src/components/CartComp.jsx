import React, { Component } from "react";
import "antd/dist/antd.css";

import { Layout, Typography, Row, Col, Button } from "antd";

import emptySvg from "../assets/empty_file.svg";
import ItemFood from "../components/ItemFood";
const { Header } = Layout;
const { Title, Text } = Typography;

export default class CartComp extends Component {
  constructor(props) {
    super();
    this.state = {
      collapsed: false,
      totalPrice: 0
    };
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  countTotalPrice = async (act, data) => {
    if(act === '+') await this.setState({totalPrice: this.state.totalPrice + parseInt(data, 10)})
    if(act === '-') await this.setState({totalPrice: this.state.totalPrice - parseInt(data, 10)})
    console.log(this.state)
  }

  emptyCart = () => {
    return (
      <Row
        type="flex"
        justify="center"
        style={{ marginTop: 100}}
      >
        <Col>
          <img src={emptySvg} alt="empty_product" style={{ width: 200 }} />
        </Col>
        <Col style={{ marginTop: 15, textAlign: "center" }}>
          <div>
            <Text strong>Your cart is empty</Text>
            <p>Please add some items from the menu</p>
          </div>
        </Col>
      </Row>
    );
  };

  listCart = () => {
    return (
      <Layout style={{background: "#fff", height:'100vh'}}>
        <Row gutter={0}>
          {this.props.onStoreState.map((item, idx) => {
            return (
              <ItemFood
                key={idx}
                pImage={item.product_image}
                pName={item.product_name}
                pPrice={item.product_price}
                pProductId={item.product_id}
                onNullQty={val => this.props.onDeleteHandling(val)}
                countTotalPrice={(act,val) => this.countTotalPrice(act,val)}
              />
            );
          })}
        </Row>
        <div style={{ display: "block", height: 'auto', background: "#fff", position:"sticky", bottom: 0}}>
          <Row>
            <Col sm={12}>
              <div
                style={{
                  textAlign: "left",
                  left: 20,
                  position: "relative",
                  marginTop: 15
                }}
              >
                <Title level={4} strong>
                  Total :
                </Title>
              </div>
            </Col>
            <Col sm={12}>
              <div
                style={{
                  textAlign: "right",
                  right: 20,
                  position: "relative",
                  marginTop: 15
                }}
              >
                <Title level={4}>Rp. 15.000.00</Title>
              </div>
            </Col>
            <Col sm={24}>
              <p>
                <span
                  style={{ color: "red", position: "relative", marginLeft: 20 }}
                >
                  *
                </span>{" "}
                no tax include
              </p>
            </Col>
            <Col sm={24}>
              <div style={{padding: 10}}>
                <Button block type="primary" style={{marginBottom: 10}}>
                  Checkout
                </Button>
                <Button block type="danger">
                  Cancel
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </Layout>
    );
  };

  render() {
    return (
      <Layout style={{height: '100vh', overflowY: 'auto'}}>
        <Header
          style={{ background: "#fff", padding: "0 30px", textAlign: "center", position:'sticky', top: 0, zIndex: 999}}
        >
          <div>
            <Text strong>Cart</Text>
            <span
              style={{
                margin: "0 10px",
                color: "#fff",
                background: "aqua",
                padding: "5px",
                borderRadius: 100
              }}
            >
              {this.props.onCountProductCart}
            </span>
          </div>
        </Header>
        <Layout style={{background: "#fff", height: '100vh'}}>
          {this.props.onStoreState.length === 0
            ? this.emptyCart()
            : this.listCart()}
        </Layout>
      </Layout>
    );
  }
}
