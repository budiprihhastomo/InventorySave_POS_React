import React from "react";
import { Icon, Menu, Layout } from "antd";
import "./SiderPart.css";

const { Sider } = Layout;

const SiderPart = props => {
  return (
    <Sider trigger={null} collapsible collapsed={props.collapsed}>
      <div className="logo" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1">
          <Icon type="user" />
          <span>List Products</span>
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="video-camera" />
          <span>History Checkout</span>
        </Menu.Item>
        <Menu.Item key="3">
          <Icon type="upload" />
          <span>Manage Products</span>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SiderPart;
