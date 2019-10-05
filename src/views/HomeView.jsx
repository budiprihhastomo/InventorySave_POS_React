import React, { Component } from "react";
import { Row, Col, Layout } from "antd";
import HomeComp from "../components/HomeComp";
import CartComp from "../components/CartComp";

export default class HomeView extends Component {
  constructor(props){
    super()
    this.state = {
      data: [],
      order: [],
    };
  }

  handlingStateHome = val => {
    this.setState({
      order: val
    });
  };

  handleOrder = data => {
    const existData = this.state.order.find(item => item.product_id === data.product_id)
    if(existData) return false
    this.setState({
      order: [...this.state.order, data]
    })
    console.log(data)
  }

  onDeleteHandling = async val => {
    let state = [...this.state.order]
    let index = state.map(el => el.product_id).indexOf(val)
    if(index !== -1) state.splice(index, 1)
    return await this.setState({order: state})
  }
  
  isAuth = () => {
    if(localStorage.getItem('auth-token')) return this.state.order
    else return []
  }
  render() {
    return (
      <Layout>
        <Row>
          <Col sm={18}>
            <HomeComp onOrder={data => this.handleOrder(data)} onFetchState={val => this.handlingStateHome(val)} />
          </Col>
          <Col sm={6}>
            <CartComp onStoreState={this.isAuth()} onCountProductCart={this.state.order.length} onDeleteHandling={(val) => this.onDeleteHandling(val)}/>
          </Col>
        </Row>
      </Layout>
    );
  }
}
