import React, { Component } from "react";
import { Link } from 'react-router-dom'
import "antd/dist/antd.css";
import SweetAlert from "sweetalert2-react";

import {
  Layout,
  Menu,
  Icon,
  Typography,
  Row,
  Col,
  Input,
  Dropdown,
  Button,
  Pagination
} from "antd";
import Axios from "axios";
import FoodComp from "./FoodComp";
const { Search } = Input;
const { Header, Sider, Content } = Layout;
const { Text } = Typography;

export default class HomeComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      products: [],
      field: "?field=name",
      sort: "&sort=desc",
      page: 1,
      totalData: 1
    };
  }

  field = (
    <Menu>
      <Menu.Item>
        <a rel="noopener noreferrer" onClick={e => this.onButtonFilter(1)}>
          By Name
        </a>
      </Menu.Item>
      <Menu.Item>
        <a rel="noopener noreferrer" onClick={e => this.onButtonFilter(2)}>
          By Category
        </a>
      </Menu.Item>
      <Menu.Item>
        <a rel="noopener noreferrer" onClick={e => this.onButtonFilter(3)}>
          By Date Updated
        </a>
      </Menu.Item>
    </Menu>
  );

  order = (
    <Menu>
      <Menu.Item>
        <a rel="noopener noreferrer" onClick={e => this.onButtonOrder(1)}>
          Ascending
        </a>
      </Menu.Item>
      <Menu.Item>
        <a rel="noopener noreferrer" onClick={e => this.onButtonOrder(2)}>
          Descending
        </a>
      </Menu.Item>
    </Menu>
  );

  onChangePage = async data => {
    await this.setState({
      page: data
    });
    return await this.fetchData(`?page=${this.state.page}`);
  };

  onChangeSearch = async e => {
    await this.fetchData(`?s=${e}`);
  };

  onButtonFilter = async e => {
    if (e === 1) await this.setState({ field: "?field=name" });
    if (e === 2) await this.setState({ field: "?field=category" });
    if (e === 3) await this.setState({ field: "?field=update" });
    return await this.fetchData(`${this.state.field}${this.state.sort}`);
  };

  onButtonOrder = async e => {
    if (e === 1) await this.setState({ sort: "&sort=asc" });
    if (e === 2) await this.setState({ sort: "&sort=desc" });
    return await this.fetchData(`${this.state.field}${this.state.sort}`);
  };

  fetchData = params => {
    Axios.get(`${process.env.REACT_APP_SERVER_HOST_API}api/v1/products/${params}`)
      .then(res => {
        return this.setState({
          products: res.data.data.content,
          totalData: res.data.data.totalData
        });
      })
      .catch(err => {
        return this.setState({ show: true });
      });
  };

  componentDidMount() {
    this.fetchData("");
  }

  toggle = () => {
    return this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    let button = ''
    if(localStorage.getItem('auth-token')) {
      button = <Menu.Item key="4">
      <Link to="/logout"></Link>
      <Icon type="login" />
      <span>Logout</span>
      </Menu.Item> 
    }
    else {
      button = <Menu.Item key="4">
      <Link to="/login">
      <Icon type="login" />
      <span>Login</span>
      </Link>
      </Menu.Item> 
    }

    return (
      <Layout style={{height: '100vh'}}>
        <Header
          style={{
            background: "#fff",
            padding: 0,
            position: "sticky",
            top: 0,
            zIndex: 999
          }}
        >
          <Row type="flex" justify="center">
            <Col sm={2} style={{ textAlign: "center" }}>
              <Icon
                className="trigger"
                type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
                onClick={this.toggle}
              />
            </Col>
            <Col sm={14} style={{ textAlign: "center" }}>
              <Text strong>Food Items</Text>
            </Col>
            <Col sm={4}>
              <Search
                placeholder="Input Search Text"
                onSearch={e => this.onChangeSearch(e)}
                style={{ width: 200, right: 100 }}
              />
            </Col>
            <Col sm={2}>
              <Dropdown overlay={this.field} placement="bottomCenter">
                <Button style={{ right: 50, width: 100 }}>Filter</Button>
              </Dropdown>
            </Col>
            <Col sm={2}>
              <Dropdown overlay={this.order} placement="bottomCenter">
                <Button style={{ right: 20, width: 100 }}>Order</Button>
              </Dropdown>
            </Col>
          </Row>
        </Header>
        <Layout>
          <Sider
            className="ant-layout-sider-light"
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            <div className="Logo"></div>
            <Menu mode="inline" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1">
                <Icon type="user" />
                <span>Food Order</span>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="audit" />
                <span>Order History</span>
              </Menu.Item>
              <Menu.Item key="3">
                <Icon type="shopping-cart" />
                <span>Manage Item</span>
              </Menu.Item>
              {button}
            </Menu>
          </Sider>
          <Content>
            <Row>
              {console.log(this.state)}
              <Pagination
                simple
                onChange={e => this.onChangePage(e)}
                defaultCurrent={1}
                total={this.state.totalData}
                defaultPageSize={8}
                style={{ padding: 20, float: "right" }}
              />
            </Row>
            <Row gutter={8}>
              {this.state.products.map((item, index) => {
                return (
                  <FoodComp
                    key={index}
                    listData={item}
                    actions={{
                      addCart: data => this.props.onOrder(data)
                    }}
                  />
                );
              })}
            </Row>
          </Content>
          <SweetAlert
            show={this.state.show}
            type="error"
            title="Data Not Found!"
            text="Product is not available."
            onConfirm={() => this.setState({ show: false })}
          />
        </Layout>
      </Layout>
    );
  }
}
