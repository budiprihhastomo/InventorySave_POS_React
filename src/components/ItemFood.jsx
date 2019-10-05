import React, { Component } from "react";
import { Col, Layout, Card, Avatar, Button, Input, Icon } from "antd";
import Rupiah from "rupiah-format";
const { Meta } = Card;

export default class ItemFood extends Component {
  state = {
    qty: 1,
    price: this.props.pPrice
  };

  addQty = async () => {
    await this.setState({
      qty: this.state.qty + 1
    });
    this.countPrice(this.state.qty);
  };

  redQty = async () => {
    if (this.state.qty > 1) {
      await this.setState({
        qty: this.state.qty - 1
      });
    }
    this.countPrice(this.state.qty);
    if (this.state.qty === 1)
      return await this.props.onNullQty(this.props.pProductId);
  };

  countPrice = async val => {
    const count = val * this.props.pPrice;
    return await this.setState({ price: count });
  };

  render() {
    return (
      <Layout>
        <Col sm={24}>
          <Card>
            <Meta
              avatar={
                <Avatar
                  src={`${process.env.REACT_APP_SERVER_HOST_API}${this.props.pImage}`}
                />
              }
              title={this.props.pName}
            />
            <div>
              <Button
                type="primary"
                shape="circle"
                icon="minus"
                size="small"
                onClick={this.redQty}
              />
              <Input
                defaultValue={1}
                style={{ width: 40, margin: "0 10px" }}
                value={this.state.qty}
              />
              <Button
                type="primary"
                shape="circle"
                icon="plus"
                size="small"
                onClick={this.addQty}
              />
            </div>
            <div style={{ right: 23, top: 23, position: "absolute" }}>
              <Icon
                type="close"
                className="trigger"
                onClick={() => this.props.onNullQty(this.props.pProductId)}
              />
            </div>
            <div
              style={{
                background: "#189",
                color: "#fff",
                width: 120,
                marginTop: 10,
                borderRadius: 100,
                textAlign: "center",
                fontWeight: "bold"
              }}
            >
              <span>{Rupiah.convert(this.state.price)}</span>
            </div>
          </Card>
        </Col>
      </Layout>
    );
  }
}
