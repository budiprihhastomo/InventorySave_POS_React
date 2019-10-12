import React, { useState, useEffect } from "react";
import { Icon, Menu, Layout } from "antd";
import "./SiderPart.css";
import { Link } from "react-router-dom";

const { Sider } = Layout;

const SiderPart = props => {
  const [keyMenu, setKeyMenu] = useState(["1"]);

  useEffect(() => {
    console.log(keyMenu);
  });

  return (
    <Sider trigger={null} collapsible collapsed={props.collapsed}>
      <div className="logo" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={keyMenu}>
        <Menu.Item key="1" onClick={val => setKeyMenu([val.key])}>
          <Link to="/dashboard" />
          <Icon type="dashboard" />
          <span>Dashboard</span>
        </Menu.Item>
        <Menu.Item key="2" onClick={val => setKeyMenu([val.key])}>
          <Icon type="video-camera" />
          <span>History Checkout</span>
        </Menu.Item>
        <Menu.Item key="3" onClick={val => setKeyMenu([val.key])}>
          <Icon type="upload" />
          <span>Manage Products</span>
        </Menu.Item>
        <Menu.Item key="4" onClick={val => setKeyMenu([val.key])}>
          <Link to="/transaction" />
          <Icon type="user" />
          <span>Order Products</span>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SiderPart;
