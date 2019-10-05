import React, { Component } from "react";
import "antd/dist/antd.css";
import { Card, Col, Button } from "antd";
import Rupiah from "rupiah-format";
import SweetAlert from "sweetalert2-react";

export default class FoodComp extends Component {
  state = {
    show: false
  }
  addCart = () => {
    if(localStorage.getItem('auth-token')) return this.props.actions.addCart(this.props.listData)
    else return this.setState({show:true})
  }

  render() {
    return (
      <Col sm={6} style={{ padding: 10 }}>
        <Card
          hoverable
          style={{ borderRadius: "15px 15px 0 0", position: "relative" }}
          cover={
            <div
              style={{
                width: "100%",
                height: "140px",
                backgroundSize: "cover",
                backgroundImage: `url(${process.env.REACT_APP_SERVER_HOST_API}${this.props.listData.product_image})`,
                borderRadius: "15px 15px 0 0"
              }}
            ></div>
          }
        >
          <div style={{ display: "block" }}>
            <h3 style={{ fontWeight: "bold" }}>
              {this.props.listData.product_name}
            </h3>
            <h4>{Rupiah.convert(this.props.listData.product_price)}</h4>
          </div>
          <Button
            type="primary"
            shape="round"
            icon="shopping-cart"
            style={{ position: "absolute", right: 10, bottom: 95 }} 
            onClick={() => this.addCart()}
          />
        </Card>
        <SweetAlert
            show={this.state.show}
            type="warning"
            title="Not Logged In!"
            text="Please login at first before add cart."
            onConfirm={() => this.setState({ show: false })}
          />
      </Col>
    );
  }
}
